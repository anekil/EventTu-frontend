import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUserCredentials(userCreds) {
    try {
        console.log("Saved user creds: " + JSON.stringify(userCreds));
        await AsyncStorage.setItem('@user_creds', JSON.stringify(userCreds));
    } catch (e) {
        console.log(e);
    }
}

export async function getUserCredentials() {
    try {
        const value = await AsyncStorage.getItem('@user_creds');
        if (value !== null) {
            console.log("Got user creds: " + value);
            return value;
        }
        return null;
    } catch (e) {
        console.log(e);
        return e;
    }
};