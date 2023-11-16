import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, PrimaryButton, TagChip} from "./Buttons";
import colors from "../theme/Colors";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";

export function EventMini() {
    return (
        <View style={{ ...styles.eventCard, flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={ styles.image } />
                <View>
                    <PrimaryButton title="Title" />
                    <View style={{flexDirection: 'row'}}>
                        <TagChip title="Tag" />
                        <TagChip title="Tag" />
                        <TagChip title="Tag" />
                    </View>
                    <IconButton icon={ faCircleInfo } style={{ alignSelf: 'flex-end' }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    eventCard: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.form_white,
        borderWidth: 2,
        borderColor: colors.extra_black,
        marginBottom: 10
    },
    image: {
        borderRadius: 20,
        height: 120,
        width: 120,
        backgroundColor: colors.extra_pink,
        borderWidth: 2,
        borderColor: colors.extra_black,
    }
});