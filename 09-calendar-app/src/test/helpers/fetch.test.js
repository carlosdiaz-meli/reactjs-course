import { fetchSinToken, fetchConToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch.js', () => {
    let token = '';

    test('fetchSinToken debe de funcionar', async () => {
        const resp = await fetchSinToken('auth', { email: 'cedv90@gmail.com', password: '123456' }, 'POST');

        expect( resp instanceof Response ).toBe(true);

        const body = await resp.json();

        expect( body.ok ).toBe(true);

        token = body.token;
    });

    test('fetchConToken debe de funcionar', async () => {
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/60907d4357bc529c30d02b8e', {}, 'DELETE');

        expect( resp instanceof Response ).toBe(true);

        const body = await resp.json();

        expect( body.ok ).toBe(false);
        expect( body.msg ).toBe('El evento no existe');
    });
});
