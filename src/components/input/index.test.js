import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Input from './';

describe('Input', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(
            <Input
                name="item"
                value="new todo"
                placeholder="New Item..."
                onChange={jest.fn()}
            />
        );
        expect(comp.toJSON()).toMatchSnapshot();
    });
    it('calls onChange', () => {
        const onChangeSpy = jest.fn();
        const comp = shallow(
            <Input
                name="item"
                value="todo"
                placeholder="New Item..."
                onChange={onChangeSpy}
            />
        );
        const newValue = 'new todo';

        expect(onChangeSpy).not.toHaveBeenCalled();
        comp.find('input').simulate('change', { target: { value: newValue } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenCalledWith(newValue);
    });
});