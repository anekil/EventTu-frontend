import {Pressable, StyleSheet, Text} from "react-native";
import * as React from "react";
import colors from "../theme/colors";

export const HeaderButton = props => {
    return (
        <Pressable style={styles.button} onPress = {props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
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
    text: {
        textAlign: "center",
        color: colors.extra_white,
        fontSize: 20,
        fontWeight: "800",
    }
});
