import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { sendTo } from '../utils/Links';
import { FloatingButton } from "../components/Buttons"
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";

export const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState(null);
  const [markers, setMarkers] = useState([]);
  const circleRadius = 2000

  const handleLongPress = (event) => {
    console.log("Entered handleLongPress");
    setPin(event.nativeEvent.coordinate);
  };

  // TODO: Dummy events (will be deleted when CORS will works)
  const loadDummyMarkers = (region) => {
    const randomOffset = () => (Math.random() - 0.5) * (circleRadius / 1000 / 111) * 2;
    setMarkers([
      {id: 'event1', title: 'Event 1', latitude: region.latitude + randomOffset(), longitude: region.longitude + randomOffset(), description: 'Description for Event 1'},
      {id: 'event2', title: 'Event 2', latitude: region.latitude + randomOffset(), longitude: region.longitude + randomOffset(), description: 'Description for Event 2'},
      {id: 'event3', title: 'Event 3', latitude: region.latitude + randomOffset(), longitude: region.longitude + randomOffset(), description: 'Description for Event 3'},
      {id: 'event4', title: 'Event 4', latitude: region.latitude + randomOffset(), longitude: region.longitude + randomOffset(), description: 'Description for Event 4'}
    ])
  }

  const loadMarkersFromServer = (response) => {
    try {
      const serverResponse = response.data;

      const newMarkers = serverResponse.map(event => ({
        id: uuidv4(),
        title: event.name,
        latitude: event.latitude,
        longitude: event.longitude,
        description: event.description
      }));

      setMarkers(newMarkers);

    } catch (error) {
        console.error('Error fetching markers:', error);
    }
  }

  // event for map drag
  const onRegionChangeComplete = (region) => {
    console.log("Entered onRegionChangeComplete: " + JSON.stringify(region));
    setLocation(region);
    
    axios.post(sendTo("events/location"), {
      "latitude" : region.latitude, 
      "longitude": region.longitude,
      "radius": Math.floor(circleRadius / 1000)
    })
    .then(response => {
        console.log(response);
        loadMarkersFromServer(response)
    })
    .catch(error => {
        console.log(error);
        loadDummyMarkers(region)
    });

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

          <Circle
            center={location}
            radius={circleRadius}
            fillColor="rgba(100, 100, 200, 0.3)" // semi-transparent fill
            strokeColor="rgba(100, 100, 200, 0.7)" // border color
            strokeWidth={2}
          />

          {markers.map(marker => (
              <Marker
                  key={marker.id}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                  title={marker.title}
              />
          ))}

        </MapView>
      ) : (
        <Text>{errorMsg}</Text>
      )}

      <FloatingButton icon={ faFilter } onPress={() => navigation.navigate('Filters')} />

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
