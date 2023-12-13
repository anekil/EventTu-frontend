import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable, ScrollView, FlatList } from 'react-native';
import {IconButton, PrimaryButton, StarButton, TagChip} from "./Buttons";
import colors from "../theme/Colors";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import { getUserData } from "../utils/Storage";
import { Container } from "../utils/ContainerEnum";
import ExampleImage from "../assets/example.png";
import { LoadingIndicator } from './LoadingIndicator';
import {Role} from "../utils/RoleEnum";

export function EventMiniOrganizer(props) {
    return (
        <Pressable style={{...styles.eventCard, flex: 1, justifyContent: 'center'}} onPress={props.onPress}>
            <View style={{flexDirection: 'row'}}>
                <ImageWithoutStar style={{width: '50%'}}/>
                <View style={{alignItems: "center",}}>
                    <PrimaryButton title={props.eventData.name}/>
                    <FlatList data={props.eventData.tags}
                              renderItem={({item}) => (
                                  <TagChip title={item}/>
                              )}
                    />
                </View>
            </View>
        </Pressable>
    );
}

export function EventMiniAtendee(props) {
    return (
        <Pressable style={{...styles.eventCard, flex: 1, justifyContent: 'center'}} onPress={props.onPress}>
            <View style={{flexDirection: 'row'}}>
                <ImageWithStar style={{width: '50%'}} event_id={props.eventData.id} favorite={props.eventData.isFavorite}/>
                <View style={{alignItems: "center",}}>
                    <PrimaryButton title={props.eventData.name}/>
                    <FlatList data={props.eventData.tags}
                              renderItem={({item}) => (
                                  <TagChip title={item}/>
                              )}
                    />
                </View>
            </View>
        </Pressable>
    );
}

const ImageWithStar = (props) => {
    return (
        <View style={{ ...styles.imageContainer, ...props.style }} >
            <Image style={ { ...styles.image }} source={ ExampleImage } resizeMode="contain" />
            <StarButton style={styles.star} event_id={props.event_id} pressed={props.favorite}/>
        </View>
    );
};

const ImageWithoutStar = (props) => {
    return (
        <View style={{ ...styles.imageContainer, ...props.style }} >
            <Image style={ { ...styles.image }} source={ ExampleImage } resizeMode="contain" />
        </View>
    );
};

export const EventDetails = (props) => {
    const [activeAvailEvent, setActiveAvailEvent] = React.useState(null);
    const [role, setRole] = React.useState(null);
    // Loading user data
    React.useEffect(() => {
        (async () => {
            try {
                let data = await getUserData(Container.AVAIL_ACTIVE_EVENT);
                const parsedData = JSON.parse(data);
                setActiveAvailEvent(parsedData);
                data = await getUserData(Container.ROLE);
                setRole(JSON.parse(data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    },[]);

    if (activeAvailEvent === null || !role) { return <LoadingIndicator/>; }

    return (
        <View style={ styles.detailsContainer } >
            <ScrollView scrollEnabled={true} >
            <PrimaryButton title={activeAvailEvent.name} />
            <View >
                { role === Role.ATTENDEE
                    ? <ImageWithStar event_id={activeAvailEvent.id} favorite={activeAvailEvent.isFavorite} />
                    : <ImageWithoutStar /> }
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                {activeAvailEvent.tags.map((title, index) => (
                    <TagChip key={index} title={title} />
                ))}
            </View>
            <Pressable style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Link do wydarzenia</Text>
                <IconButton icon={ faLink } />
            </Pressable>

            <View style={styles.descriptionContainer} >
                <Text>{activeAvailEvent.description}</Text>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    eventCard: {
        borderRadius: 20,
        padding: 12,
        backgroundColor: colors.form_white,
        borderWidth: 2,
        borderColor: colors.extra_black,
        margin: 10,
        overflow: "scroll",
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
    miniImage: {
        borderRadius: 20,
        width: 120,
        height: 120,
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