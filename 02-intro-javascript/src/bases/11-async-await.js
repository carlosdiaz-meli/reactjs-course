const apiKey = 'sqQOHDNaCw1JvcYTbrnetsT7NuYdwFXU';
const apiUrl = 'http://api.giphy.com/v1/gifs/random';

const getImagen = async () => {
    try {
        const respuesta = await fetch(`${apiUrl}?api_key=${apiKey}`);
        const { data } = await respuesta.json();
        const { url } = data.images.original;

        const img = document.createElement('img');
        img.src = url;

        document.body.append(img);
    }
    catch (e) {
        // Manejo del error
        console.error(e);
    }
};

getImagen().then(console.log);