import * as React from 'react';
import { View, Text } from 'react-native';
import { PrimaryButton } from "../components/button";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export function MapScreen({ navigation }) {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 39.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
}