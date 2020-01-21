import React, { Component } from 'react';
import TodolistTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

    id = 3;

    state = {
        input:'',
        todos: [
            {id: 0, text: '리엑트 소개', checked: false},
            {id: 1, text: 'JSX 사용해보기', checked: true},
            {id: 2, text: '라이프사이클 이해하기', checked: false}
        ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '',
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const { todos } = this.state;

        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];

        const nextTodos = [...todos];

        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        })
    }

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
        
    }

    render(){
        const { input, todos } = this.state;
        const{
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;
        return (
            <TodolistTemplate form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                />
            )}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
            </TodolistTemplate>
        );
    }
}

export default App;
