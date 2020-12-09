export const getGifs = async category => {

    const apiKey = 'sqQOHDNaCw1JvcYTbrnetsT7NuYdwFXU';
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${ apiKey }&limit=10&q=${ encodeURI( category ) }`;

    const resp   = await fetch(url);
    const { data } = await resp.json(); 

    const gifs = data.map( img => ({
        id: img.id,
        title: img.title,
        url: img.images?.downsized_medium.url
    }));

    return gifs;
};