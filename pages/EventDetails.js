import * as React from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import {
    FormView,
    FormText,
    FormTextInput,
    SubmitButton,
    FormMultiLineInput,
    TagsPicker
} from "../components/FormElements";
import { InfoPopup } from '../components/InfoModal';
import colors from "../theme/Colors";
import { sendTo } from '../utils/Links';
import * as ImagePicker from "expo-image-picker";
import {IconButton} from "../components/Buttons";
import {faFileImage} from "@fortawesome/free-solid-svg-icons/faFileImage";
import { Container } from "../utils/ContainerEnum";
import { saveUserData, getUserData } from "../utils/Storage";

export function EventDetailsScreen({ navigation }) {
    const [title, setTitle] = React.useState('');
    const [eventLink, setEventLink] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [image, setImage] = useState(null);
    const [textValue, setTextValue] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [pin, setPin] = React.useState(null);
    const [activeOwnerEvent, setActiveOwnerEvent] = React.useState(null);

    // Loading user data
    React.useEffect(() => {
        (async () => {
            try {
                const data = await getUserData(Container.OWNER_ACTIVE_EVENT);
                const parsedData = JSON.parse(data);
                if(parsedData){
                    setPin({"latitude": parsedData.latitude, "longitude": parsedData.longitude});
                    setSelectedTags(parsedData.tags);
                    setTitle(parsedData.name);
                    setTextValue(parsedData.description);
                }
                setActiveOwnerEvent(parsedData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    },[]);

    // Location settings
    React.useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log(location);
        })();
    }, []);
    // show loading if user data not ready
    if (activeOwnerEvent === null || location === null) { return <ActivityIndicator size="large" color={colors.primary} />; }

    console.log("active event: " + JSON.stringify(activeOwnerEvent));
    console.log("type of active event: " + JSON.stringify(typeof activeOwnerEvent));


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleLongPress = (event) => {
        console.log(event.nativeEvent.coordinate);
        setPin(event.nativeEvent.coordinate);
        activeOwnerEvent.latitude = event.nativeEvent.coordinate.latitude;
        activeOwnerEvent.longitude = event.nativeEvent.coordinate.longitude;
    };


    function createEvent(){

    }

    function updateEvent(){

    }

    function deleteEvent(){

    }


    return (
        <ScrollView scrollEnabled={true} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{ width: '80%', marginTop: 40, marginBottom: 40 }}>

                <FormText title="Title"/>
                <FormTextInput
                    placeholder={"Enter Title"}
                    secureTextEntry={false}
                    value={title} 
                    onChangeText={text => setTitle(text)}
                />

                <FormText title="Event Link"/>
                <FormTextInput
                    placeholder="Enter event link" 
                    secureTextEntry={false}
                    value={eventLink} 
                    onChangeText={text => setEventLink(text)}
                />

                <FormText title="Tags"/>
                <TagsPicker selectedTags={ selectedTags } setSelectedTags={ setSelectedTags } />

                <FormText title="Image"/>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton icon={ faFileImage } onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>

                <FormText title="Description"/>
                <FormMultiLineInput
                    onChangeText={text => setTextValue(text)}
                    value={textValue}
                    placeholder={"Enter your text here"}
                />

                <FormText title="Location"/>
                <Text>Long press to choose</Text>
                {location ? (
                    <MapView
                        style={styles.map}
                        initialRegion={location}
                        onLongPress={handleLongPress}
                        showsUserLocation={true}
                    >
                        {pin && (
                            <Marker coordinate={pin}>
                            <Callout>
                                <Text>Event Location</Text>
                            </Callout>
                            </Marker>
                        )}
                    </MapView>
                ) : (
                    <Text>{errorMsg}</Text>
                )}

                <View style={styles.buttonContainer}>
                    {!activeOwnerEvent && (
                        <>
                            <SubmitButton title="Add Event" onPress={createEvent} />
                        </>
                    )}
                    {activeOwnerEvent && (
                        <>
                            <SubmitButton title="Update Event" onPress={updateEvent} />
                            <SubmitButton title="Delete Event" onPress={deleteEvent} />
                        </>
                    )}
                </View>

            </FormView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 300,
      marginTop: 20,
    },
    textArea: {
        height: 100, // Set the height
        borderColor: 'gray', // Set border color
        borderWidth: 1, // Set border width
        textAlignVertical: 'top', // Align text to top
        padding: 10, // Add padding
        borderRadius: 10,
    },
    map: {
        width: '100%',
        height: 300,
    },
    formTextInputLike: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.extra_white,
    }
  });
