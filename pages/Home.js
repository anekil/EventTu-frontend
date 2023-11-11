import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/Button";
import { FormView, FormText } from "../components/FormElements";
import colors from "../theme/Colors";

export function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{alignItems: 'center', justifyContent: 'center',}}>
                <FormText title="Who are You?"/>
                <PrimaryButton style={{"marginTop": 20}} title="Attendee" onPress={() => navigation.navigate('Map')} />
                <PrimaryButton style={{"marginTop": 20, "backgroundColor": colors.primary_light}} title="Organizer" onPress={() => navigation.navigate('Login')} />
            </FormView>
        </View>
    );
}