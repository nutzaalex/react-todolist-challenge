import axios from 'axios';

import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    SHOW_ERROR
} from './types';

const getInitialList = (list) => ({
    type: GET_ITEMS,
    payload: list
});

const addItem = (todo) => ({
    type: ADD_ITEM,
    payload: todo,
});

const deleteItem = (todo) => ({
    type: DELETE_ITEM,
    payload: todo,
});

const updateItem = (todo) => ({
    type: UPDATE_ITEM,
    payload: todo,
});

const setError = (errorMessage) => ({
    type: SHOW_ERROR,
    payload: errorMessage,
});

export const fetchInitialList = () => dispatch => {
    return axios.get('http://localhost:9000/')
        .then(res => {
            dispatch(getInitialList(res.data));
        })
        .catch(() => {
            dispatch(setError('Error while fetching the list'));
        });
};

export const addItemToList = (todo) => dispatch => {
    //update UI
    dispatch(addItem({id: todo, item: todo}));
    //send request
    return axios.put('http://localhost:9000/new', {
        item:todo
    })
        .then(res => {
            //update UI with server data & remove placeholder
            dispatch(deleteItem({id: todo, item: todo}));
            dispatch(addItem(res.data));
        })
        .catch(() => {
            //remove placeholder and set error if request failed
            dispatch(deleteItem({id: todo, item: todo}));
            dispatch(setError('Error while adding todo'));
        });
};

export const deleteItemFromList = (todo) => dispatch => {
    dispatch(deleteItem({id: todo.id, item: todo}));
    return axios.delete('http://localhost:9000/delete', {
        data: {
            item: todo.item,
            id: todo.id,
        }
    })
        .then(res => {})
        .catch(() => {
            dispatch(addItem({id: todo, item: todo}));
            dispatch(setError('Error while deleting todo'));
        });
};

export const updateItemInList = (todo, newTodo) => dispatch => {
    dispatch(updateItem(newTodo));
    return axios.put('http://localhost:9000/update', {
        item: newTodo.item,
        id: newTodo.id
    })
        .then(res => {})
        .catch(() => {
            dispatch(updateItem(todo));
            dispatch(setError('Error while updating todo'));
        });
};