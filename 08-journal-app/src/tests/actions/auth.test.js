import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = {
    uid: 'TESTING',
    displayName: 'TEST'
};

const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth-actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login y logout deben de crear la acción respectiva', async () => {
        const loginAction = login(user.uid, user.displayName);

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                ...user
            }
        });

        const logoutAction = logout();

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    });

    test('debe de realizar el logout', async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('debe de iniciar el startLoginEmailPassword', async () => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiStartLoading
        });

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });
    }); 
    
});
