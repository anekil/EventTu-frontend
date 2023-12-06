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
}

export async function saveFilters(filters) {
    try {
        await AsyncStorage.setItem('filters', JSON.stringify(filters));
    } catch (e) {
        console.log(e);
    }
}

export async function resetFilters() {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    try {
        await AsyncStorage.setItem('filters', JSON.stringify({
            "startDate": today,
            "endDate": tomorrow,
            "radius": 2,
            "tags": [],
            "onlyFavourites": false,
            "isFree": false
        }));
    } catch (e) {
        console.log(e);
    }
}

export async function getFilters() {
    try {
        return await AsyncStorage.getItem('filters');
    } catch (e) {
        console.log(e);
        return e;
    }
}