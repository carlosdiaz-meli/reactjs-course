import { heroes } from '../data/heroes';

export const getHeroesByName = ( name = '' ) => name === '' ? [] : heroes.filter( hero => hero.superhero.toLowerCase().includes(name.toLowerCase()) );