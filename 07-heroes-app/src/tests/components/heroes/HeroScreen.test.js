import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };
    
    test('debe de mostrar el componente Redirect si no hay argumentos en la url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    
    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );
        
        expect(wrapper.find('.row').exists()).toBe(true);
    });
    
    test('debe de regresar a la pantalla anterior con PUSH', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').simulate('click');

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });
    
    test('debe de regresar a la pantalla anterior con goBack', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').simulate('click');

        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
    });
    
    test('debe de llamar el Redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider123'] }>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        
        expect(wrapper.text()).toBe('');
    });
    
});
