import * as React from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {useState} from 'react';
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
import { getUserData } from "../utils/Storage";
import { LoadingIndicator } from '../components/LoadingIndicator';
import {uploadToDropbox} from "../utils/DropboxCommunication";

export function EventDetailsScreen({ navigation }) {
    const [title, setTitle] = React.useState('');
    const [eventLink, setEventLink] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [textValue, setTextValue] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);
    const [isSuccessPopupVisible, setSuccessPopupVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [pin, setPin] = React.useState(null);
    const [activeOwnerEvent, setActiveOwnerEvent] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    // Loading user data
    React.useEffect(() => {
        (async () => {
            try {
                const data = await getUserData(Container.OWNER_ACTIVE_EVENT);
                const data2 = await getUserData(Container.LOGIN);
                const parsedData = JSON.parse(data);
                const parsedUserData = JSON.parse(data2);
                if(parsedData && parsedUserData){
                    setPin({"latitude": parsedData.latitude, "longitude": parsedData.longitude});
                    setSelectedTags(parsedData.tags);
                    setTitle(parsedData.name);
                    setTextValue(parsedData.description);
                }
                setActiveOwnerEvent(parsedData);
                setUserData(parsedUserData);
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
    if (activeOwnerEvent === null || location === null) { return <LoadingIndicator/>; }

    console.log("active event: " + JSON.stringify(activeOwnerEvent));
    console.log("type of active event: " + JSON.stringify(typeof activeOwnerEvent));


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await uploadToDropbox(image).then((url) => setImageUrl(url));
        }
    };

    const handleLongPress = (event) => {
        console.log(event.nativeEvent.coordinate);
        setPin(event.nativeEvent.coordinate);
    };


    function validateEvent(){
        if(!title){ return { isOk: false, msg: "Title is required" }; }
        else if(selectedTags.length === 0) { return { isOk: false, msg: "Tags are required" }; }
        else if(!textValue){ return { isOk: false, msg: "Description is required" }; }
        else if(!pin || !pin.latitude || !pin.longitude){ return { isOk: false, msg: "Location is required" }; }
        return { isOk: true, msg: "Registration is valid" };
    }

    function prepareEventRequest(){
        return {
            "name": title,
            "free": true,
            "description": textValue,
            "owner": userData.id,
            "latitude": pin.latitude,
            "longitude": pin.longitude,
            "tags": selectedTags,
            "startTime": "2023-11-27 20:30:25",
            "endTime": "2023-11-27 21:53:25",
        };
    }

    function handleEvent(isUpdate){
        const { isOk, msg } = validateEvent();
        if(!isOk){
            setErrorMessage(msg)
            setFailurePopupVisible(true);
        }
        else{
            const request = prepareEventRequest();
            console.log(request);
            (isUpdate === true ? axios.put(sendTo(`events/${activeOwnerEvent.id}`), request) : axios.post(sendTo("events"), request))
              .then(response => {
                  console.log(response.data)
                  setSuccessMessage("Success");
                  setSuccessPopupVisible(true);
              })
              .catch(error => {
                  console.log(error)
                  setErrorMessage(String(error));
                  setFailurePopupVisible(true);
              });
        }
    }

    function deleteEvent(){
        axios.delete(sendTo(`events/${activeOwnerEvent.id}`))
        .then(response => {
            console.log(response.data);
            setSuccessMessage("Event was successfully deleted");
            setSuccessPopupVisible(true);
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(String(error));
            setFailurePopupVisible(true);
        });
    }


    const closeFailurePopup = () => {
        setFailurePopupVisible(false);
    };

    const closeSuccessPopup = () => {
        setSuccessPopupVisible(false);
        navigation.navigate('OrganizerEvents');
    };

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
                            <SubmitButton title="Add Event" onPress={() => handleEvent(false)} />
                        </>
                    )}
                    {activeOwnerEvent && (
                        <>
                            <SubmitButton title="Update Event" onPress={() => handleEvent(true)} />
                            <SubmitButton title="Delete Event" onPress={deleteEvent} />
                        </>
                    )}
                </View>

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                    info={errorMessage}
                    iconType="times-circle"
                    iconColor="red"
                />

                <InfoPopup
                    isVisible={isSuccessPopupVisible}
                    onClose={closeSuccessPopup}
                    info={successMessage}
                    iconType="check-circle"
                    iconColor="green"
                />

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
