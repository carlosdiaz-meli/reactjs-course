import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'mundo',
    url: 'https://algunlugar.com/foto.jpg'
};

describe('Pruebas en JournalEntry', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <JournalEntry { ...note } />
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de llamar el activeNote', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalled(activeNote(note.id, {...note}));
    });
    
});
