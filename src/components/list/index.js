import React, {Component} from "react";

import './index.css';
import Button from '../button';

class List extends Component {

    handleDelete(todo) {
        this.props.deleteItem(todo);
    }

    handleUpdate(todo) {
            let item = prompt("Please update your todo:", todo.item);
            if (item) {
                this.props.updateItem(todo, {item: item, id: todo.id});
            }
    }
    render() {
        const {todoList} = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <th width='66%'>Item</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todoList && todoList.length > 0 && todoList.map(todo => (
                    <tr key={todo.id}>
                        <td>{todo.item}</td>
                        <td>
                            <Button type='edit' onClick={this.handleUpdate.bind(this, todo)}>Edit</Button>
                            <Button type='delete' onClick={this.handleDelete.bind(this, todo)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default List;
