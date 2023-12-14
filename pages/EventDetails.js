import * as React from 'react';
import {View} from 'react-native';
import {EventDetails} from "../components/Events";

export function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <EventDetails />
        </View>
    );
}
