import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable, ScrollView} from 'react-native';
import {IconButton, PrimaryButton, StarButton, TagChip} from "./Buttons";
import colors from "../theme/Colors";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import ExampleImage from "../assets/example.png";
import {FormMultiLineInput} from "./FormElements";

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

const ImageWithStar = () => {
    return (
        <View style={ styles.imageContainer } >
            <Image style={ { ...styles.image }} source={ ExampleImage } resizeMode="contain" />
            <StarButton style={styles.star} />
        </View>
    );
};

export const EventDetails = (props) => {
    return (
        <View style={ styles.detailsContainer } >
            <ScrollView scrollEnabled={true} >
            <PrimaryButton title={"Kapitularz"} />
            <View >
                <ImageWithStar />
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <TagChip title="Fantastyka" />
                <TagChip title="Anime" />
                <TagChip title="Gry planszowe" />
                <TagChip title="Fantastyka" />
                <TagChip title="Anime" />
                <TagChip title="Gry planszowe" />
            </View>
            <Pressable style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Link do wydarzenia</Text>
                <IconButton icon={ faLink } />
            </Pressable>

            <View style={styles.descriptionContainer} >
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat lorem at est egestas, ut sollicitudin ante dignissim. Sed nec ante tempus risus pellentesque scelerisque. Nullam porta enim vel arcu aliquam, a pulvinar sem tristique. Nullam elementum nibh at odio mattis placerat. Aliquam et sem massa. Proin neque turpis, pulvinar sed lectus eu, dignissim fringilla tortor. Fusce quis sapien sed augue vehicula luctus vel vitae arcu. Curabitur vitae nunc pellentesque, luctus ex vel, tincidunt felis. Ut vestibulum in sem nec tempus. Nullam congue posuere nisl, sit amet tempor dolor efficitur et. Donec vel mattis ex, ac efficitur arcu.
                    Phasellus dictum felis nec vehicula congue. Phasellus ac sem convallis, sagittis orci sed, feugiat libero. Mauris sagittis, massa aliquet finibus ultrices, quam arcu fringilla lorem, ut ultricies ipsum turpis sit amet metus. Ut ac metus eget libero aliquet commodo quis nec nunc. Suspendisse hendrerit, orci nec sollicitudin congue, libero eros luctus magna, nec molestie dui sapien et purus. Maecenas pellentesque, nunc a pharetra pellentesque, sapien risus consectetur turpis, ut bibendum metus diam vel purus. Mauris ut faucibus eros, in faucibus ex. Nulla pretium dui quis sollicitudin eleifend. Etiam ut odio eu velit tempus posuere. Pellentesque ut nibh in ex commodo rhoncus. Donec sed hendrerit tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin varius massa eget leo molestie scelerisque.
                </Text>
            </View>
            </ScrollView>
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
        padding: 12,
        backgroundColor: colors.form_white,
        borderWidth: 3,
        borderColor: colors.extra_black,
        width: '80%',
        height: '90%'
    },
    descriptionContainer: {
        borderRadius: 20,
        padding: 12,
        backgroundColor: colors.form_white,
        borderWidth: 2,
        borderColor: colors.extra_black,
    },
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 20,
        width: '90%',
        height: 'auto',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: colors.extra_black,
    },
    star: {
        position: 'absolute',
        top: -5,
        left: 0,
        zIndex: 1,
    },
    text: {
        color: colors.extra_black,
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 10,
    }
});