import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

import '@testing-library/jest-dom';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en actions auth.js', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
    
    test('startLogin correcto', async () => {
        await store.dispatch(startLogin('cedv90@gmail.com', '123456'));

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: { uid: expect.any(String), name: expect.any(String) }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin incorrecto', async () => {
        await store.dispatch(startLogin('cedv90@gmail.com', 'xxxxxx'));

        let actions = store.getActions();

        expect( actions ).toEqual([]);

        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');

        await store.dispatch(startLogin('cedv90@gmail2.com', 'xxxxxx'));

        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'El usuario no existe con ese email', 'error');
    });

    test('startRegister correcto', async () => {
        fetchModule.fetchSinToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'Edu',
                    token: 'asdf123'
                };
            },
        }));

        await store.dispatch( startRegister('carlos.d@hotmail.com', 'asdf1234', 'Edu') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: { uid: '123', name: 'Edu' },
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'asdf123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking correcto', async () => {
        fetchModule.fetchConToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'Edu',
                    token: 'asdf123'
                };
            },
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: { uid: '123', name: 'Edu' }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'asdf123');
    });
});