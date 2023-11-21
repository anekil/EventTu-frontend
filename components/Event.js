import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {IconButton, PrimaryButton, TagChip} from "./Buttons";
import colors from "../theme/Colors";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import ExampleImage from "../assets/example.jpg";


export function EventMini() {
    return (
        <View style={{ ...styles.eventCard, flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={ styles.image } source={ ExampleImage } />
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

export const EventDetails = (props) => {
    return (
        <View style={{ ...styles.detailsContainer, width: "80%"}}>
            <PrimaryButton title={"Kapitularz"} />
            <View style={{flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center'}}>
                <TagChip title="Fantastyka" />
                <TagChip title="Anime" />
                <TagChip title="Gry planszowe" />
                <TagChip title="Fantastyka" />
                <TagChip title="Anime" />
                <TagChip title="Gry planszowe" />
            </View>
            <Image style={ { ...styles.image, alignSelf: 'center' }} source={ ExampleImage } />
            <Pressable style={{flexDirection: 'row'}}>
                <Text>Link do wydarzenia</Text>
                <IconButton icon={ faLink } />
            </Pressable>



        </View>
    );
};

const styles = StyleSheet.create({
    eventCard: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.form_white,
        borderWidth: 2,
        borderColor: colors.extra_black,
        marginBottom: 10
    },
    detailsContainer: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.form_white,
        borderWidth: 3,
        borderColor: colors.extra_black
    },
    image: {
        borderRadius: 20,
        height: 120,
        width: 120,
        borderWidth: 2,
        borderColor: colors.extra_black,
    }
});