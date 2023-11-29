import * as React from 'react';
import {View} from 'react-native';
import {PrimaryButton} from "../components/Buttons";
import {EventDetails} from "../components/Events";

export function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <EventDetails />
        </View>
    );
}

export function MutableDetailsScreen(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <EventDetails />
            <View style={{flexDirection: 'row'}}>
                <PrimaryButton title={"Edit"} />
                <PrimaryButton title={"Delete"} />
            </View>
        </View>
    );
}
