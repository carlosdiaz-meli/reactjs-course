import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

describe('Pruebas en RegisterScreen', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
        
    });

    test('debe de mostrar la caja de alerta con el error', () => {
        const emailError = 'Email no es correcto';
        const initState = {
            ui: {
                loading: false,
                msgError: emailError
            },
            auth: {}
        };
        
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe(emailError);
    });

});
