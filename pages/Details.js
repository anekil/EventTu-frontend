import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FormView} from "../components/FormElements";
import {PrimaryButton, TagChip} from "../components/Buttons";
import colors from "../theme/Colors";
import {EventDetails} from "../components/Event";

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
