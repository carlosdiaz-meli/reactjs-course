import { shallow } from 'enzyme';
import { HookApp } from '../HooksApp';

describe('Pruebas en <HookApp />', () => {

    test('debe de mostrarse correctamente', () => {

        const wrapper = shallow(<HookApp />);

        expect( wrapper ).toMatchSnapshot();

    });

});