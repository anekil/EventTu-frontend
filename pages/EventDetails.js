import * as React from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { FormView, FormText, FormTextInput, SubmitButton } from "../components/FormElements";
import { InfoPopup } from '../components/InfoModal';
import colors from "../theme/Colors";
import { sendTo } from '../utils/Links';

export function EventDetailsScreen({ navigation }) {
    const [title, setTitle] = React.useState('');
    const [eventLink, setEventLink] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [textValue, setTextValue] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [pin, setPin] = React.useState(null);

    // tags stuff
    const dummyTags = [{"id":1,"name":"tag1"},{"id":2,"name":"tag2"},{"id":3,"name":"tag3"},{"id":4,"name":"tag4"},{"id":5,"name":"tag5"},{"id":6,"name":"tag6"},{"id":7,"name":"tag7"},{"id":8,"name":"tag8"},{"id":9,"name":"tag9"},{"id":10,"name":"tag10"}]

    useEffect(() => { getTags(); }, []);

    const getTags = () => {
        console.log(sendTo(`tags`));
        axios.get(sendTo(`tags`))
            .then(response => {
                setTags(response);
            })
            .catch(error => {
                console.log(error)
                setTags(dummyTags);
                console.log(tags);
            });
    }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    // add event handler
    const addEvent = () => {
        console.log(sendTo(`tags`));
        axios.get(sendTo(`tags`))
            .then(response => {
                setTags(response);
            })
            .catch(error => {
                console.log(error)
                setTags(dummyTags);
                console.log(tags);
            });
    }


    // Location settings
    useEffect(() => {
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

    const handleLongPress = (event) => {
        setPin(event.nativeEvent.coordinate);
    };


    return (
        <ScrollView scrollEnabled={true} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.extra_white, }}>
            <FormView style={{ width: '80%' }}>

                <FormText title="title"/>
                <FormTextInput
                    placeholder="Enter Title"
                    secureTextEntry={false}
                    value={title} 
                    onChangeText={text => setTitle(text)}
                />

                <FormText title="event link"/>
                <FormTextInput
                    placeholder="Enter event link" 
                    secureTextEntry={false}
                    value={eventLink} 
                    onChangeText={text => setEventLink(text)}
                />

                <FormText title="tags"/>
                <MultiSelect
                    uniqueKey="id"
                    items={tags}
                    selectedItems={selectedItems}
                    selectText="Pick Tags"
                    onSelectedItemsChange={onSelectedItemsChange}
                    displayKey="name"
                />
                {selectedItems && <Text>Selected: {selectedItems.join(', ')}</Text>}

                <FormText title="description"/>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4} // You can set the number of lines you want
                    onChangeText={text => setTextValue(text)}
                    value={textValue}
                    placeholder="Enter your text here"
                />

                <FormText title="location"/>
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



                <SubmitButton title="Add Event" onPress={addEvent} />

            </FormView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
  });
