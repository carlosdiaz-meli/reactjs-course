import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        loading: false,
        msgError: null
    },
    auth: {}
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en LoginScreen', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de disparar la acción de startLoginScreen', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('debe de disparar la acción de startLoginEmailPassword', () => {
        const email = 'carlos.diaz@gmail.com';
        const pass = 'asdf1234';

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith(email, pass);
    });

});
