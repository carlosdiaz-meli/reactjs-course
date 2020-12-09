
// Desestructuración
// Asignación Desestructurante
const persona = {
    nombre: 'Tony',
    edad: 45,
    clave: 'Ironman',
    // rango: 'Soldado'
};

// const { nombre, edad, clave } = persona;

// console.log( nombre );
// console.log( edad );
// console.log( clave );

const useContext = (  { clave, nombre, edad, rango = 'Capitán' } ) => {
    return {
        nombreClave: clave,
        anios: edad,
        latlng: {
            lat: 13.3487,
            lng: -12.8475
        }
    }
};

const { nombreClave, anios, latlng: { lat, lng } } = useContext(persona);

console.log( nombreClave, anios );
console.log( lat, lng );