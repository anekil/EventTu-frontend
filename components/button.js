import {Pressable, StyleSheet, Text, Touchable} from "react-native";
import * as React from "react";
import colors from "../theme/colors";

export const PrimaryButton = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.primaryButton, ...props.style}}  onPress = {props.onPress}>
            <Text style={styles.primaryText}>{props.title}</Text>
        </Pressable>
    );
}

export const HeaderButton = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.headerButton, ...props.style}} onPress = {props.onPress}>
            <Text style={styles.headerText}>{props.title}</Text>
        </Pressable>
    );
}

export const TagChip = props => {
    return (
        <Pressable style={{...styles.blackBorder, ...styles.tagChip, ...props.style}}>
            <Text style={styles.tagText}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    blackBorder: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black
    },

    primaryButton: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 6,
        margin: 5
    },
    primaryText: {
        textAlign: "center",
        color: colors.extra_black,
        fontSize: 20,
        fontWeight: "800",
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
        textAlign: "center",
        color: colors.extra_white,
        fontSize: 20,
        fontWeight: "800",
    },

    tagChip: {
        backgroundColor: colors.primary_light,
        borderRadius: 15,
        padding: 5,
        margin: 5,
    },
    tagText: {
        textAlign: "center",
        color: colors.extra_black,
        fontSize: 16,
        fontWeight: "800",
    }
});
