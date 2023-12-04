import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { sendTo } from '../utils/Links';
import { FloatingButton } from "../components/Buttons"
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";
import {HeaderAuthorized} from "../components/Headers";
import { Container } from "../utils/ContainerEnum";
import {getFilters, saveUserData} from '../utils/Storage';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circleRadius, setCircleRadius] = useState(2);

  // Location settings
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Entered location: " + JSON.stringify(location));
      onRegionChangeComplete({
        "longitudeDelta":location.coords.accuracy / 1000,
        "latitudeDelta":location.coords.accuracy / 1000,
        "longitude":location.coords.longitude,
        "latitude":location.coords.latitude,
      });  // init first move to show events
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log(location);
    })();
  }, []);
  if (location === null) { return <LoadingIndicator/>; }


  const handleLongPress = (event) => {
    console.log("Entered handleLongPress");
    setPin(event.nativeEvent.coordinate);
  };

  function loadMarkersFromServer(events) {
    try {
      setMarkers([]);
      const newMarkers = events.map(event => ({
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
  async function onRegionChangeComplete(region) {
    console.log("Entered onRegionChangeComplete: " + JSON.stringify(region));
    setLocation(region);

    let filters = getFilters().then(() => {
      console.log(JSON.stringify(filters));
      filters = JSON.parse(filters);
      const {radius, ...filtersData} = filters;
      if(radius){
        setCircleRadius(radius);
      }

      const mapData = {
        "latitude": region.latitude,
        "longitude": region.longitude,
        "radius": circleRadius,
        "startDate": "2023-11-27",
        "endDate": "2023-11-27",
      };

      let data = { ...filtersData, ...mapData };
      console.log("###");
      console.log(JSON.stringify(mapData));
    });

    axios.post(sendTo("events/search"), {
      "latitude": region.latitude,
      "longitude": region.longitude,
      "radius": circleRadius,
      //"searchString": "event",
      "startDate": "2023-11-27",
      "endDate": "2023-11-27",
      //"isFree": true,
    })
        .then(response => {
          console.log(response.data);
          saveUserData(Container.AVAIL_EVENTS, response.data);
          loadMarkersFromServer(response.data)
        })
        .catch(error => {
          console.log(error);
        });

  }


  return (
    <>
    <HeaderAuthorized navigation={navigation} />

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
            radius={circleRadius*1000}
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
    </>
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
