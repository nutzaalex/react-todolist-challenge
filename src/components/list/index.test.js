import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import List from './';

const todoList = [{id: 0, item: 'test1'}, {id: 1, item: 'test2'}, {id: 2, item: 'test3'}];

const spy = jest.fn();

describe('List', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<List todoList={todoList} deleteItem={jest.fn} updateItem={jest.fn}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    beforeEach(() => {
        window.prompt = spy;
    });
    it('calls deleteItem', () => {
        const deleteItemSpy = jest.fn();
        const comp = mount(<List todoList={todoList} deleteItem={deleteItemSpy} />);

        expect(deleteItemSpy).not.toHaveBeenCalled();
        comp.find('[type="delete"]').at(1).simulate('click');
        expect(deleteItemSpy).toHaveBeenCalledTimes(1);
        expect(deleteItemSpy).toHaveBeenCalledWith(todoList[1]);
    });
    it('opens a prompt to edit the todo', () => {
        const updateItemSpy = jest.fn();
        const comp = mount(<List todoList={todoList} updateItem={updateItemSpy} />);

        expect(updateItemSpy).not.toHaveBeenCalled();
        comp.find('[type="edit"]').at(1).simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});