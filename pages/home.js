import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import { FormView, FormText, FormTextInput } from "../components/form";
import colors from "../theme/colors";

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