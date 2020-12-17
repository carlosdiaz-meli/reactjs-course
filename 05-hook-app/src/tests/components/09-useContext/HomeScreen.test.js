import React from 'react';
import { mount } from 'enzyme';
import { HomeScreen } from '../../../components/09-useContext/HomeScreen';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe('pruebas en <HomeScreen />', () => {

    const user = {
        name: 'Carlos',
        email: 'carlos.diaz@gmail.com'
    }

    const wrapper = mount(
        <UserContext.Provider value={{
            user
        }}>
            <HomeScreen />
        </UserContext.Provider>
    );
   
    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

});