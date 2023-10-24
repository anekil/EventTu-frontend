import {Pressable, StyleSheet, Text} from "react-native";
import * as React from "react";
import colors from "../theme/colors";

export const PrimaryButton = props => {
    return (
        <Pressable style={styles.button} onPress = {props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black,
        borderRadius: 20,
        padding: 6,
    },
    text: {
        textAlign: "center",
        color: "black",
    }
});
