import { shallow } from 'enzyme';
import { GifGridItem } from '../../components/GifGridItem';

describe('Pruebas en <GifGridItem />', () => {
    
    const title = 'Un título';
    const url = 'http://localhost/algo.jpg';
    
    let wrapper = shallow(<GifGridItem title={ title } url={ url }  />);

    beforeEach( () => {
        wrapper = shallow(<GifGridItem title={ title } url={ url } />);
    });

    test('debe de mostrar <GifGridItem /> correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de tener un párrafo con el title', () => {

        const parrafo = wrapper.find('p');
       
        expect( parrafo.text().trim() ).toBe( title );

    });

    test('debe de tener la imagen igual al url y alt de los props', () => {

        const img = wrapper.find('img');
       
        expect( img.prop('src') ).toBe( url );
        expect( img.prop('alt') ).toBe( title );

    });

    test('debe de tener la clase animate__fadeIn', () => {

        const div = wrapper.find('div');
       
        expect( div.hasClass('animate__fadeIn') ).toBe( true );

    });

})
