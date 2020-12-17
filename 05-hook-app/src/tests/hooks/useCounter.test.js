import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../../hooks/useCounter';

describe('Pruebas en useCounter', () => {
   
    test('debe de retornar valores por defecto', () => {
        
        const { result } = renderHook( () => useCounter() );

        expect( result.current.counter ).toBe(10);
        expect( typeof result.current.increment ).toBe('function');
        expect( typeof result.current.decrement ).toBe('function');
        expect( typeof result.current.reset ).toBe('function');

    });

    test('debe de tener el counter en 100', () => {
        
        const { result } = renderHook( () => useCounter(100) );

        expect( result.current.counter ).toBe(100);

    });

    test('debe de incrementar el counter en 1', () => {
        
        const { result } = renderHook( () => useCounter(100) );
        const { increment } = result.current;

        act( () => increment() );

        expect( result.current.counter ).toBe(101);

    });

    test('debe de disminuir el counter en 1', () => {
        
        const { result } = renderHook( () => useCounter(100) );
        const { decrement } = result.current;

        act( () => decrement() );

        expect( result.current.counter ).toBe(99);

    });

    test('debe de establecer el valor inicial', () => {
        
        const { result } = renderHook( () => useCounter(100) );
        const { reset, increment } = result.current;

        act( () => {
            increment();
            reset();
        });

        expect( result.current.counter ).toBe(100);

    });

});
