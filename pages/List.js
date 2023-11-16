import * as React from 'react';
import {Text, View} from 'react-native';
import {FloatingButton} from "../components/Buttons";
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";
import {HeaderAuthorized} from "../components/Headers";

export function ListScreen({ navigation }) {
    return (
        <>
        <HeaderAuthorized />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>List Screen</Text>

            <FloatingButton icon={ faFilter } onPress={() => navigation.navigate('Filters')} />
        </View>
        </>
    );
}