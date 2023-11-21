import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {FloatingButton} from "../components/Buttons";
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";
import {HeaderAuthorized} from "../components/Headers";
import {EventMini} from "../components/Event";

export function ListScreen({ navigation }) {
    const events = [1, 2, 3, 4];

    return (
        <>
        <HeaderAuthorized navigation={navigation} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList data={events}
                      renderItem={({item}) => (
                          <EventMini
                              onPress={() => navigation.navigate('Details')}
                              title={item.label}
                          /> )
                      }
            />
            <FloatingButton icon={ faFilter } onPress={() => navigation.navigate('Filters')} />
        </View>
        </>
    );
}