import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    notes: {
        notes: [],
        active: {
            id: 'ABC',
            title: 'Hola',
            body: 'mundo',
            date: 0
        }
    },
    auth: {}
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en NoteScreen', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <NoteScreen />
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de llamar el activeNote', () => {
        const title = 'Hola de nuevo!!!';
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: title
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(initState.notes.active.id, {
            ...initState.notes.active,
            title
        });
    });
    
});
