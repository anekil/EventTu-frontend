import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pin, setPin] = useState(null);
    const [eventInfo, setEventInfo] = useState({ tags: '', date: '' });
    const [modalVisible, setModalVisible] = useState(false);

  const [eventData, setEventData] = useState({
    title: '',
    eventLink: '',
    tags: [],
    image: null,
    description: '',
    localization: null
  });

  const updateEventData = (key, value) => {
    setEventData({ ...eventData, [key]: value });
  };

  const handleLongPress = (event) => {
    console.log("here 123");
    setPin(event.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleEventCreation = () => {
    console.log(eventData);
    setModalVisible(false);
  };

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
    })();
  }, []);

  return (
    <View style={styles.container}>
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            onChangeText={(text) => updateEventData('title', text)}
            value={eventData.title}
          />
          <TextInput
            placeholder="Event Link"
            style={styles.input}
            onChangeText={(text) => updateEventData('eventLink', text)}
            value={eventData.eventLink}
          />
          <TextInput
            placeholder="Tags"
            style={styles.input}
            onChangeText={(text) => updateEventData('tags', text.split(','))}
            value={eventData.tags.join(', ')}
          />
          <View style={styles.imageUploader}>
            <Text>Click to browse or drag and drop your files</Text>
          </View>
          <TextInput
            placeholder="Description"
            style={styles.input}
            onChangeText={(text) => updateEventData('description', text)}
            value={eventData.description}
            multiline={true}
          />
          <View style={styles.mapPreview}>
            <Text>Map preview will be here</Text>
          </View>
          <Button title="Add event" onPress={handleEventCreation} />
        </View>
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: '100%',
        height: '100%',
      },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  imageUploader: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  mapPreview: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
