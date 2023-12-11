import { authorize, refresh, revoke } from 'react-native-app-auth';
import axios from "axios";

const DROPBOX_APP_KEY = 'qtsw5yj854kwxyq';
const DROPBOX_REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
const DROPBOX_UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload';

const DROPBOX_OAUTH_CONFIG = {
    issuer: 'https://www.dropbox.com/oauth2',
    clientId: DROPBOX_APP_KEY,
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
        tokenEndpoint: 'https://api.dropboxapi.com/oauth2/token',
        revocationEndpoint: 'https://api.dropboxapi.com/2/auth/token/revoke',
    },
    redirectUrl: DROPBOX_REDIRECT_URI,
    scopes: ['files.content.write', 'files.content.read'],
};

const getImageBlob = async (imageUri) => {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
    });
};
export const authorizeDropbox = async () => {
    try {
        const authResult = await authorize(DROPBOX_OAUTH_CONFIG);
        const authorizationCode = authResult.authorizationCode;

        const refreshResult = await refresh(DROPBOX_OAUTH_CONFIG, { authorizationCode });
        const token = refreshResult.accessToken;

        return token;
    } catch (error) {
        console.error('Error authorizing with Dropbox:', error);
        throw error;
    }
};

export const revokeDropboxAccess = async (token) => {
    try {
        await revoke(DROPBOX_OAUTH_CONFIG, { token });
    } catch (error) {
        console.error('Error revoking Dropbox access:', error);
        throw error;
    }
};

export const uploadToDropbox = async (imageUri) => {
    let token = await authorizeDropbox();
    const pathInDropbox = '/' + Date.now() + '-image.jpg';
    try {
        const fileUri = imageUri.replace('file://', '');
        const response = await axios.post(
            DROPBOX_UPLOAD_URL,
            {
                path: pathInDropbox,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream',
                },
                data: fileUri,
            }
        );
        console.log('File uploaded successfully:', response.data);
        return response.data.path_display;
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        throw error;
    }
};

/*
    try {
        console.log("try entered");

        const imageBlob = await getImageBlob(imageUri);
        console.log(imageBlob);
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
        imageBlob.close();
        return shareData.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    } catch (error) {
        console.error(error);
        throw error;
    }
 */
