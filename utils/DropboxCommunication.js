import axios from "axios";

const getImageBlob = async (imageUri) => {
    const response = await fetch(imageUri);
    return response.blob();
};

export const uploadToDropbox = async (imageUri) => {
    console.log("entered");
    const accessToken = 'sl.BrH5PoaoKHB6D4RigZgt6wr1GlavHH0m4Fv_1t-PLkVikXwnpdXMYENmPLOLJHSfaZfyiy8GQQ6slJzqhl43ez0VMvVY5lghbm2C_82LyqGPCP3v5nEKCpajPfFbUrHl7qKeX63uu6KA26J-sIxhYRc';
    const dropboxApiUrl = 'https://content.dropboxapi.com/2/files/upload';
    const pathInDropbox = "/" + Date.now() + '-image.jpg';

    try {
        console.log("try entered");

        const imageBlob = await getImageBlob(imageUri);
        const response = await axios({
            url: 'https://content.dropboxapi.com/2/files/upload',
            method: 'post',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Dropbox-API-Arg': JSON.stringify({
                    path: pathInDropbox,
                }),
                'Content-Type': 'application/octet-stream'
            },
            data: imageBlob
        });

        console.log("1");
        console.log(response);
        const data = await response;
        console.log("2");

        if (!response.ok) {
            console.log("3");
            console.log(response)
        }

        console.log("4");

        const shareResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: pathInDropbox }),
        });

        console.log("5");
        const shareData = await shareResponse;

        console.log("6");
        if (!shareResponse.ok) {
            console.log(shareResponse);
        }

        console.log("7");
        return shareData.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    } catch (error) {
        console.error(error);
        throw error;
    }
};