import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/Buttons";
import { FormView, FormText } from "../components/FormElements";
import colors from "../theme/Colors";
import { Role } from "../utils/RoleEnum";
import {HeaderAppName} from "../components/Headers";

export function HomeScreen({ navigation }) {
    return (
        <>
        <HeaderAppName/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{alignItems: 'center', justifyContent: 'center',}}>
                <FormText title="Who are You?"/>
                <PrimaryButton style={{"marginTop": 20}} title="Attendee" onPress={() => navigation.navigate('Login', {role: Role.ATTENDEE})} />
                <PrimaryButton style={{"marginTop": 20, "backgroundColor": colors.primary_light}} title="Organizer" onPress={() => navigation.navigate('Login', {role: Role.ORGANIZER})} />
            </FormView>
        </View>
        </>
    );
}