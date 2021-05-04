import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebase-config';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        loading: false,
        msgError: null
    },
    auth: {},
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en AppRouter', () => {
    
    test('Debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act(async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect( login ).toHaveBeenCalledWith('lKSit7c6zvewUiTp1nchshzBzat1', null);

    });

});
