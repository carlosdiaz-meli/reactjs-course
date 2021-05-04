import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

    test('debe de autenticar y colocar el name del usuario y el uid', () => {
        const displayName = 'Carlos';
        const uid = 12345;

        const state = authReducer({ }, {
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(state).toEqual({
            name: displayName,
            uid
        });
    });

    test('debe de hacer el logout', () => {
        const state = authReducer({ name: 'Carlos', uid: 1234 }, {
            type: types.logout
        });

        expect( state ).toEqual({ });
    });

    test('no debe de hacer cambios en el state', () => {
        const initialState = { name: 'Carlos', uid: 1234 };
        const state = authReducer(initialState, {
            type: 'no existe'
        });

        expect(state).toEqual(initialState);
    });
    
});
