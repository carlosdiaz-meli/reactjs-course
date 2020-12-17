import { renderHook, act } from '@testing-library/react-hooks';
import { useFetch } from '../../hooks/useFetch';

describe('Pruebas en useFetch', () => {

    const baseUrl = 'https://www.breakingbadapi.com/api/';
    const quoteById = 'quotes/';
    const url = baseUrl + quoteById + 1;
   
    test('debe de retornar la información por defecto', () => {        

        const { result } = renderHook( () => useFetch(url) );

        const { data, loading, error } = result.current;

        expect( data ).toBe( null );
        expect( loading ).toBe( true );
        expect( error ).toBe( null );

    });

    test('debe de tener la info deseada', async () => {

        const { result, waitForNextUpdate } = renderHook( () => useFetch(url) );
        await waitForNextUpdate();

        const { data, loading, error } = result.current;

        expect( data.length ).toBe( 1 );
        expect( loading ).toBe( false );
        expect( error ).toBe( null );

    });

    test('debe de tener manejar el error', async () => {

        const { result, waitForNextUpdate } = renderHook( () => useFetch('https://reqres.in/apid/users?page=2') );
        await waitForNextUpdate();

        const { data, loading, error } = result.current;

        expect( data ).toBe( null );
        expect( loading ).toBe( false );
        expect( error ).toBe( 'No se pudo cargar la info' );

    });

});
