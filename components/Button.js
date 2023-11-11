import {Pressable, StyleSheet, Text} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";

export const PrimaryButton = props => {
    return (
        <Pressable style={{...styles.primaryButton, ...props.style}}  onPress = {props.onPress}>
            <Text style={styles.primaryText}>{props.title}</Text>
        </Pressable>
    );
}

export const HeaderButton = props => {
    return (
        <Pressable style={{...styles.headerButton, ...props.style}} onPress = {props.onPress}>
            <Text style={styles.headerText}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black,
        borderRadius: 20,
        width: 148,
        height: 34,
    },
    primaryText: {
        textAlign: "center",
        color: colors.extra_black,
        fontSize: 20,
        fontWeight: "800",
    },

    headerButton: {
        backgroundColor: colors.primary_dark,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black,
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
    }
});
