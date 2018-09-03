import React from 'react';
import {mount, shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

const todoList = [{id: 0, item: 'test1'}, {id: 1, item: 'test2'}, {id: 2, item: 'test3'}];

jest.mock('react-redux', () => ({
    connect: () => HOC => HOC,
}));

describe('App', () => {
    it('renders with default props', () => {
        const comp = renderer.create(<App todoList={todoList} fetchInitialList={jest.fn()}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it('renders with max props', () => {
        const comp = renderer.create(<App todoList={todoList}
                                          error={'some error text'}
                                          fetchInitialList={jest.fn()}
                                          addItemToList={jest.fn()}
                                          deleteItemFromList={jest.fn()}
                                          updateItemInList={jest.fn()}
        />);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it('fetches the todo list', () => {
        const fetchInitialListSpy = jest.fn();
        shallow(<App todoList={todoList} fetchInitialList={fetchInitialListSpy}/>);

        expect(fetchInitialListSpy).toHaveBeenCalledTimes(1);
    });
    it('calls addItemToList when user clicks on the add button', () => {
        const addItemToListSpy = jest.fn();
        const comp = mount(
            <App
                todoList={todoList}
                fetchInitialList={jest.fn()}
                addItemToList={addItemToListSpy}
            />
        );
        const newTodo = 'new todo';
        comp.find('input').simulate('change', {target: {value: newTodo}});

        expect(comp.find('input').prop('value')).toBe(newTodo);
        expect(addItemToListSpy).not.toHaveBeenCalled();

        comp.find('[type="add"]').simulate('click');

        expect(addItemToListSpy).toHaveBeenCalledTimes(1);
        expect(addItemToListSpy).toHaveBeenCalledWith(newTodo);
    });
    it("updates the input text while typing", () => {
        const comp = mount(<App todList={todoList} fetchInitialList={jest.fn()}/>);
        const newTodo = 'new todo';
        comp.find('input').simulate('change', {target: {value: newTodo}});

        expect(comp.find('input').prop('value')).toBe(newTodo);
    });
});