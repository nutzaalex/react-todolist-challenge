import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    SHOW_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    todoList: [],
    error: ''
};

const ListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                todoList: action.payload
            };
        case ADD_ITEM:
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            };
        case DELETE_ITEM:
            return {
                ...state,
                todoList: state.todoList.filter(item => item.id !== action.payload.id)
            };
        case UPDATE_ITEM:
            return {
                ...state,
                todoList: state.todoList.map(item => {
                    if (item.id === action.payload.id) {
                        return {...action.payload};
                    }
                    return item;
                })
            };
        case SHOW_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default ListReducer;
