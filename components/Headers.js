import { StyleSheet, Text, View} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";
import {HeaderButton, IconButton} from "./Buttons";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";


export const HeaderAppName = props => {
    return (
        <View style={{...styles.headerContainer, ...styles.blackBorder, ...props.style}}>
            <Text style={{...styles.headerText}}>EventTu</Text>
        </View>
    );
}

export const HeaderAuthorized = props => {
    return (
        <View style={{...styles.headerContainer, ...styles.blackBorder, ...props.style}}>
            <HeaderButton title={"Logout"} style={{margin:10}} />
            <IconButton icon={ faUser} onPress={() => props.navigation.navigate('Profile')} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        backgroundColor: colors.primary_dark,
        marginTop: 40,
        margin: 10,
        borderRadius: 20,
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        color: colors.extra_white,
        padding: 20
    },
    blackBorder: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.extra_black
    }
});