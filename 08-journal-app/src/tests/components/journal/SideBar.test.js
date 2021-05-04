import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { SideBar } from '../../../components/journal/SideBar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    notes: {
        notes: []
    },
    auth: {}
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en SideBar', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <SideBar />
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de llamar el startLogout', () => {
        wrapper.find('button').simulate('click');

        expect( startLogout ).toHaveBeenCalled();
    });

    test('Debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    });
    
});
