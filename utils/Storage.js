import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUserData(dataContainer, userData) {
    try {
        console.log("Saved user data: " + JSON.stringify(userData));
        await AsyncStorage.setItem(dataContainer, JSON.stringify(userData));
    } catch (e) {
        console.log(e);
    }
}

export async function getUserData(dataContainer) {
    try {
        const value = await AsyncStorage.getItem(dataContainer);
        if (value !== null) {
            console.log("Got user data: " + value);
            return value;
        }
        return null;
    } catch (e) {
        console.log(e);
        return e;
    }
};