import { shallow } from 'enzyme';
import CounterApp from '../CounterApp';

describe('Pruebas en <CounterApp />', () => {

    let wrapper = shallow(<CounterApp />);

    beforeEach( () => {
        wrapper = shallow(<CounterApp />);
    });
   
    test('debe de mostrar <CounterApp /> correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();

    });
   
    test('debe de mostrar el valor por defecto de 100', () => {
       
        const valor = 100;

        const wrapper = shallow(
            <CounterApp
                value={ valor }
            />
        );

        const counterText = wrapper.find('h2').text().trim();

        expect( counterText ).toBe( `${valor}` );

    });

    test('debe de incrementar con el botón de +1', () => {
        
        wrapper.find('button').at(0).simulate('click');

        const counterText = wrapper.find('h2').text().trim();

        expect( counterText ).toBe( '11' );

    });

    test('debe de decrementar con el botón de -1', () => {
        
        wrapper.find('button').at(2).simulate('click');

        const counterText = wrapper.find('h2').text().trim();

        expect( counterText ).toBe( '9' );

    });

    test('debe de colocar el valor por defecto con el btn reset', () => {
       
        const valor = 105;

        const wrapper = shallow(
            <CounterApp
                value={ valor }
            />
        );

        const btnAdd = wrapper.find('button').at(0);
        btnAdd.simulate('click');
        btnAdd.simulate('click');
        wrapper.find('button').at(1).simulate('click');
        const counterText = wrapper.find('h2').text().trim();

        expect( counterText ).toBe( `${ valor }` );

    });
    
});
