import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: 'cedv90',
    api_key: '457623287356686',
    api_secret: 'hhvBVgGkToUI9_y07gEImWLgpYE'
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {

        const resp = await fetch('https://img.olx.com.br/thumbs256x256/46/462010103686962.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        await cloudinary.v2.api.delete_resources(imageId);

    });

    test('debe de retornar error', async () => {

        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect(url).toBe(null);

    });

});
