import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/Buttons";
import { FormView, FormText } from "../components/FormElements";
import colors from "../theme/Colors";
import { Role } from "../utils/RoleEnum";
import {HeaderAppName} from "../components/Headers";
import { Container } from "../utils/ContainerEnum";
import {saveUserData} from "../utils/Storage";

export function HomeScreen({ navigation }) {

    function redirect(role){
        saveUserData(Container.ROLE, role);
        navigation.navigate('Login');
    }

    return (
        <>
        <HeaderAppName/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{alignItems: 'center', justifyContent: 'center',}}>
                <FormText title="Who are You?"/>
                <PrimaryButton style={{"marginTop": 20}} title="Attendee" onPress={() => redirect(Role.ATTENDEE)} />
                <PrimaryButton style={{"marginTop": 20, "backgroundColor": colors.primary_light}} title="Organizer" onPress={() => redirect(Role.ORGANIZER)} />
            </FormView>
        </View>
        </>
    );
}