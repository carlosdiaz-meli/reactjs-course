import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    // const state = {
    //     name: 'Carlos',
    //     logged: true
    // };

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });
    });

    test('debe de autenticar y colocar el name del usuario', () => {
        const name = 'Carlos';
        const state = authReducer({ logged: false }, {
            type: types.login,
            payload: {
                name
            }
        });

        expect(state).toEqual({
            name,
            logged: true
        });
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const state = authReducer({ logged: true, name: 'Carlos' }, {
            type: types.logout
        });

        expect( state ).toEqual({ logged: false });
    });

});