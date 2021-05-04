/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = {
    uid: 'TESTING'
}

const initState = {
    auth: {
        ...user
    }
};

let store = mockStore(initState);

describe('Pruebas en notes-action', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('debe de crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[1].payload.id;

        await db.doc(`${ user.uid }/journal/notes/${ docId }`).delete();
    });

    test('debe de cargar las notas startLoadingNotes', async () => {
        await store.dispatch( startLoadingNotes(user.uid) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect( actions[0].payload[0] ).toMatchObject( expected );
    });

    test('debe de actualizar la nota startSaveNote', async () => {
        
        const note = {
            id: 'ZXDqhFTPxxk1vmJbKp58',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote(note) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );

    });

});
