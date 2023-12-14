import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable, ScrollView, FlatList } from 'react-native';
import {IconButton, PrimaryButton, StarButton, TagChip} from "./Buttons";
import colors from "../theme/Colors";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import { getUserData } from "../utils/Storage";
import { Container } from "../utils/ContainerEnum";
import { LoadingIndicator } from './LoadingIndicator';
import {Role} from "../utils/RoleEnum";
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";

export function EventMiniOrganizer(props) {
    return (
        <Pressable style={{...styles.eventCard, flex: 1, justifyContent: 'center'}} onPress={props.onPress}>
            <View style={{flexDirection: 'row'}}>
                <ImageWithoutStar style={{width: '50%'}} image={props.eventData.tags[0].name}/>
                <View style={{alignItems: "center",}}>
                    <PrimaryButton title={props.eventData.name}/>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        {props.eventData.tags.map((item) => (
                            <TagChip key={item.id} title={item.name} />
                        ))}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export function EventMiniAtendee(props) {
    return (
        <Pressable style={{...styles.eventCard, flex: 1, justifyContent: 'center', alignItems: "center",}} onPress={props.onPress}>
            <ImageWithStar style={{width: '50%'}} event_id={props.eventData.id} favorite={props.eventData.isFavorite} image={props.eventData.tags[0].name} />
            <PrimaryButton title={props.eventData.name}/>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                {props.eventData.tags.map((item) => (
                    <TagChip key={item.id} title={item.name} />
                ))}
            </View>
        </Pressable>
    );
}

const images = {
    concert: require('./images/concert.png'),
    convention: require('./images/convention.png'),
    lecture: require('./images/lecture.png'),
    tournament: require('./images/tournament.png'),
    festival: require('./images/festival.png'),
    workshops: require('./images/workshops.png')
}


const ImageWithStar = (props) => {
    return (
        <View style={{ ...styles.imageContainer, ...props.style }} >
            <Image style={ { ...styles.image }} source={images[props.image] ? images[props.image] : images["festival"] } resizeMode="contain" />
            <StarButton style={styles.star} event_id={props.event_id} pressed={props.favorite}/>
        </View>
    );
};

const ImageWithoutStar = (props) => {
    return (
        <View style={{ ...styles.imageContainer, ...props.style }} >
            <Image style={ { ...styles.image }} source={{uri: ('./images/' + props.image + '.png')}} resizeMode="contain" />
        </View>
    );
};

export const EventDetails = () => {
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
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};

    return (
        <View style={ styles.detailsContainer } >
            <ScrollView scrollEnabled={true} >
            <PrimaryButton title={activeAvailEvent.name} />
            <View >
                { role === Role.ATTENDEE
                    ? <ImageWithStar event_id={activeAvailEvent.id} favorite={activeAvailEvent.isFavorite} image={activeAvailEvent.tags[0].name}/>
                    : <ImageWithoutStar image={activeAvailEvent.tags[0].name}/> }
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                {activeAvailEvent.tags.map((item) => (
                    <TagChip key={item.id} title={item.name} />
                ))}
            </View>
            {/*<Pressable style={{flexDirection: 'row'}}>*/}
            {/*    <Text style={styles.text}>Link do wydarzenia</Text>*/}
            {/*    <IconButton icon={ faLink } />*/}
            {/*</Pressable>*/}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconButton icon={ faCalendar } />
                { activeAvailEvent.startTime
                    ? <Text style={styles.text}>{new Date(activeAvailEvent.startTime).toLocaleString([], dateOptions)} - {new Date(activeAvailEvent.endTime).toLocaleString([], dateOptions)}</Text>
                    : <></> }
            </View>

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
        padding: 4,
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
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 10,
    }
});