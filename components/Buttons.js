import {Pressable, StyleSheet, Text, Touchable} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";

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
            <Text style={styles.headerText}>{props.title}</Text>
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
        backgroundColor: colors.primary_dark,
        borderRadius: 10,
        padding: 10,
        height: 56,
        margin: 10,
        marginTop: 30,
    },
    headerText: {
        color: colors.extra_white,
    },

    floatingButton: {
        backgroundColor: colors.secondary,
        borderRadius: 50,
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 10,
        right: 10,
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
