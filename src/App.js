import React, {Component} from 'react';
import {connect} from 'react-redux';

import List from './components/list';
import Input from './components/input';
import Button from './components/button';

import {fetchInitialList, addItemToList, deleteItemFromList, updateItemInList} from './actions/listActions';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {newTodo: ''};

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchInitialList();
    }

    handleChange(value) {
        this.setState(() => ({
            newTodo: value,
        }));
    }

    onClick(e) {
        e.preventDefault();
        if (this.state.newTodo) {
            this.props.addItemToList(this.state.newTodo);
            this.setState(() => ({
                newTodo: '',
            }));
        }
    }

    render() {
        const {error, todoList, deleteItemFromList, updateItemInList} = this.props;
        return (
            <div className="container">
                {error ? (<div className="error">{error}</div>) : null}
                <h1>Todo List</h1>

                <div className='add-item-to-list'>
                    <Input
                        name='item'
                        placeholder='New Item...'
                        value={this.state.newTodo}
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.onClick} type='add'>
                        Add
                    </Button>
                </div>

                <List
                    todoList={todoList}
                    deleteItem={deleteItemFromList}
                    updateItem={updateItemInList}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todoList: state.list.todoList,
    error: state.list.error,
});

const mapDispatchToProps = {fetchInitialList, addItemToList, deleteItemFromList, updateItemInList};

export default connect(mapStateToProps, mapDispatchToProps)(App);

