import {StyleSheet, View, Text, TextInput} from "react-native";
import * as React from "react";
import colors from "../theme/colors";

export const FormView = props => {
    return (
        <View style={{...styles.form, ...props.style}}>
            {props.children}
        </View>
    );
}

export const FormText = props => {
    return (
        <Text style={styles.text}>{props.title}</Text>
    );
}

export const FormTextInput = props => {
    return (
        <TextInput style={styles.textInput} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder}>
            {props.children}
        </TextInput>
    );
}

export const FormLink = props => {
    return (
        <Text style={styles.link} onPress={props.onPress}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    form: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.form_white,
        borderWidth: 3,
        borderColor: colors.extra_black,
    },
    text: {
        color: colors.extra_black,
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 10,
    },
    textInput: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.extra_white,
        marginBottom: 10,
    },
    link: {
        color: colors.primary_dark,
        textDecorationLine: 'underline',
        fontSize: 12,
    },
});
