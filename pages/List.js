import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {FloatingButton} from "../components/Buttons";
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";
import {HeaderAuthorized} from "../components/Headers";
import {EventMini} from "../components/Event";
import ownerEventsExample from "../examples/ownerEventsExample.json";  // example content of events

export function ListScreen({ navigation }) {
    const events = ownerEventsExample;

    return (
        <>
        <HeaderAuthorized navigation={navigation} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList data={events}
                      renderItem={({item}) => (
                        <EventMini
                            onPress={() => onOwnerEventPress(item.id)}
                            eventData={item}
                        /> )
                    }
            />
            <FloatingButton icon={ faFilter } onPress={() => navigation.navigate('Filters')} />
        </View>
        </>
    );
}