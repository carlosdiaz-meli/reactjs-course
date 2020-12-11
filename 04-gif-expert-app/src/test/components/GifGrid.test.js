import { shallow } from 'enzyme';
import { GifGrid } from '../../components/GifGrid';
import { useFetchGifs } from '../../hooks/useFetchGifs';

jest.mock('../../hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {

    const category = 'Simpsons';

    test('debe de mostrarse correctamente', () => {

        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        });

        const wrapper = shallow(<GifGrid category={ category } />);

        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {

        const gifs = [{
            id: 'abc',
            title: 'Cualquier cosa',
            url: 'https://localhost/cualqueir/cosa.jpg'
        },
        {
            id: 'def',
            title: 'Cualquier cosa 2',
            url: 'https://localhost/cualqueir/cosa2.jpg'
        }];

        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        });

        const wrapper = shallow(<GifGrid category={ category } />);

        expect( wrapper.find('p').exists() ).toBe( false );
        expect( wrapper.find('GifGridItem').length ).toBe( gifs.length );

    });

});