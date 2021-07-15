import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
    checking: true,
};

describe('Pruebas en authReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = authReducer(initState, {});

        expect( state ).toEqual(initState);
    });

    test('Debe de autenticar al usuario', () => {
        const loginAction = { type: types.authLogin, payload: { uid: '123', name: 'Edu' } };

        let state = authReducer(initState, loginAction);

        expect( state ).toEqual({ checking: false, name: 'Edu', uid: '123' });
    });
});
