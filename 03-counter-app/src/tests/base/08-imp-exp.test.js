import { getHeroeById, getHeroesByOwner } from '../../base/08-imp-exp';
import heroes  from '../../data/heroes';

describe('Pruebas en funciones de Héroes', () => {
    
    test('debe de retornar un héroe por id', () => {
        
        const id = 1;
        const heroe = getHeroeById( id );

        const heroeData = heroes.find( h => h.id === id);

        expect( heroe ).toEqual( heroeData );

    });
    
    test('debe de retornar undefined si Héroe no existe', () => {
        
        const id = 10;
        const heroe = getHeroeById( id );

        expect( heroe ).toBe( undefined );

    });
    
    test('debe de retornar los héroes de DC', () => {
        
        const owner = 'DC';
        const heroesByOwner = getHeroesByOwner( owner );

        const heroeData = heroes.filter( h => h.owner === owner);

        expect( heroesByOwner ).toEqual( heroeData );

    });
    
    test('debe de retornar los héroes de Marvel', () => {
        
        const owner = 'Marvel';
        const heroesByOwner = getHeroesByOwner( owner );

        // const heroeData = heroes.filter( h => h.owner === owner) ;

        expect( heroesByOwner ).toHaveLength( 2 )

    });

});
