import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import Button from './';

describe('Button', () => {
    it(`matches snapshot for type add`, () => {
        const comp = renderer.create(
            <Button type='add'>Add</Button>
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it(`matches snapshot for type edit`, () => {
        const comp = renderer.create(
            <Button type='edit'>Edit</Button>
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it(`matches snapshot for type default`, () => {
        const comp = renderer.create(
            <Button type='default'>Default</Button>
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it('calls onClick handler', () => {
        const onClickSpy = jest.fn();
        const comp = shallow(
            <Button type="add" onClick={onClickSpy}>
                Add
            </Button>
        );

        expect(onClickSpy).not.toHaveBeenCalled();
        comp.find('button').simulate('click');
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
});
