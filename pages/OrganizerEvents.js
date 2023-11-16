import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/Buttons";
import { FormView, FormText } from "../components/FormElements";
import colors from "../theme/Colors";
import { Role } from "../utils/RoleEnum";

import { FloatingButton } from "../components/Buttons"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {HeaderAuthorized} from "../components/Headers";

export function OrganizerEventsScreen({ navigation }) {
    return (
        <>
        <HeaderAuthorized />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{alignItems: 'center', justifyContent: 'center',}}>
                <FormText title="Placeholder, click +"/>
            </FormView>

            <FloatingButton icon={ faPlus } onPress={() => navigation.navigate('EventDetails')} />

        </View>
        </>
    );
}