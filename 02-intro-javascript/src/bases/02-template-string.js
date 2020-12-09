const nombres = 'Carlos Eduardo';
const apellidos = 'Díaz Valbuena';

// const nombreCompleto = nombres + ' ' + apellidos;
const nombreCompleto = `${ nombres } ${ apellidos }`;

console.log( nombreCompleto );

function getSaludo(nombre) {
    return 'Hola ' + nombre;
} 

console.log(`Este es un texto: ${ getSaludo( nombres ) }`);