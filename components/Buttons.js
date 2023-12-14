import {Pressable, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useState} from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faStar as faFullStar} from "@fortawesome/free-regular-svg-icons/faStar";
import axios from "axios";
import {sendTo} from "../utils/Links";
import {getUserData, saveUserData} from "../utils/Storage";
import {Container} from "../utils/ContainerEnum";

export const PrimaryButton = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.buttonText, ...styles.primaryButton, ...props.style}}  onPress = {props.onPress}>
            <Text style={{...styles.buttonText, ...styles.primaryText}}>{props.title}</Text>
        </Pressable>
    );
}

export const HeaderButton = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.headerButton, ...props.style}} onPress = {props.onPress}>
            <Text style={{...styles.buttonText, ...styles.headerText, fontSize: 14}}>{props.title}</Text>
        </Pressable>
    );
}

export const FloatingButton = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.floatingButton, ...props.style}} onPress = {props.onPress}>
            <View style={ styles.centerContent }>
                <FontAwesomeIcon icon={ props.icon } size={ 36 } />
            </View>
        </Pressable>
    );
}

export const IconButton = props => {
    return (
        <Pressable style={{ width: 40, height: 40, ...props.style }} onPress = {props.onPress}>
            <View style={ styles.centerContent }>
                <FontAwesomeIcon icon={ props.icon } size={ 28 } />
            </View>
        </Pressable>
    );
}

export const StarButton = props => {
    const [pressed, setPressed] = useState(props.pressed);

    async function updateSavedData(value) {
        setPressed(value);
        let loadedEvents = await getUserData(Container.AVAIL_EVENTS);
        loadedEvents = JSON.parse(loadedEvents);
        const updatedData = loadedEvents.map(event => {
            if (event.id === props.event_id) {
                return {...event, isFavorite: value};
            }
            return event;
        });
        await saveUserData(Container.AVAIL_EVENTS, updatedData);
    }

    async function onPress() {
        console.log("checking if favorite")
        if (pressed) {
            console.log("deleting: " + "favorites/" + props.event_id)
            axios.delete(sendTo("favorites/" + props.event_id))
                .then(async () => await updateSavedData(false).then(() => console.log("saved")))
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log("posting: " + "favorites/" + props.event_id)
            axios.post(sendTo("favorites/" + props.event_id))
                .then(async () => await updateSavedData(true).then(() => console.log("saved")))
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <Pressable style={{ width: 50, height: 50, ...props.style }} onPress = { async () => await onPress() }>
            <View style={{ ...styles.centerContent, position: 'relative' }}>
                <FontAwesomeIcon icon={ faStar } size={ 46 } style={{ zIndex: 1, color: pressed ? colors.secondary : colors.extra_white, position: 'absolute', top: 0, left: 0 }} />
                <FontAwesomeIcon icon={ faFullStar } size={ 48 } style={{ zIndex: 2, position: 'absolute', top: 0, left: 0 }}/>
            </View>
        </Pressable>
    );
}

export const TagChip = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.buttonText, ...styles.tagChip, ...props.style}}>
            <Text style={{...styles.buttonText, ...styles.tagText}}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    blackBorder: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
    },

    primaryButton: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 6,
        margin: 5
    },
    primaryText: {
        color: colors.extra_black,
    },

    headerButton: {
        backgroundColor: colors.extra_black,
        borderRadius: 40,
        padding: 6
    },
    headerText: {
        color: colors.extra_white,
    },

    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatingButton: {
        backgroundColor: colors.secondary,
        borderRadius: 50,
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        padding: 6,
    },

    tagChip: {
        backgroundColor: colors.primary_light,
        borderRadius: 15,
        padding: 5,
        margin: 5,
    },
    tagText: {
        color: colors.extra_black,
        fontSize: 16,
    }
});
