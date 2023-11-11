import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import { AddEventModal} from '../components/AddEventModal';

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
    console.log("Entered handleLongPress");
    setPin(event.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleEventCreation = () => {
    console.log("Entered handleEventCreation");
    console.log(eventData);
    setModalVisible(false);
  };

  const closeModal = () => {
    console.log("Entered closeModal");
    setModalVisible(false);
  }

  const onRegionChangeComplete = (region) => {
    console.log("Entered onRegionChangeComplete");
    setLocation(region);
  };
  

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
    })();
  }, []);

  return (
    <View style={styles.container}>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          onRegionChangeComplete={onRegionChangeComplete}
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
    
    <AddEventModal
      isVisible={modalVisible}
      onPress={handleEventCreation}
      onClose={closeModal}
      onChangeText={updateEventData}
      eventData={eventData}
    />

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
});
