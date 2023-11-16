import {Pressable, StyleSheet, Text, Touchable, View} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMugSaucer} from "@fortawesome/free-solid-svg-icons/faMugSaucer";

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
            <Text style={{...styles.buttonText, ...styles.headerText}}>{props.title}</Text>
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
        <Pressable style={{...props.style, width: 40, height: 40,}} onPress = {props.onPress}>
            <View style={ styles.centerContent }>
                <FontAwesomeIcon icon={ props.icon } size={ 28 } />
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
