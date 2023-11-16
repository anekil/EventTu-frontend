import * as React from 'react';
import {FlatList, View} from 'react-native';
import { PrimaryButton } from "../components/Buttons";
import { FormView, FormText } from "../components/FormElements";
import colors from "../theme/Colors";
import { Role } from "../utils/RoleEnum";

import { FloatingButton } from "../components/Buttons"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {HeaderAuthorized} from "../components/Headers";
import {EventMini} from "../components/Event";
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";

export function OrganizerEventsScreen({ navigation }) {
    const events = [1, 2, 3, 4];

    return (
        <>
        <HeaderAuthorized />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList data={events} renderItem={ EventMini } />
            <FloatingButton icon={ faPlus } onPress={() => navigation.navigate('EventDetails')} />
        </View>
        </>
    );
}