import * as React from 'react';
import {FlatList, View } from 'react-native';
import {HeaderAuthorized} from "../components/Headers";
import {EventMiniAtendee} from "../components/Events";
import { Container } from "../utils/ContainerEnum";
import { useIsFocused } from '@react-navigation/native';
import { saveUserData, getUserData } from "../utils/Storage";
import { LoadingIndicator } from '../components/LoadingIndicator';
import {Searchbar} from "react-native-paper";

export function ListScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [availEvents, setAvailEvents] = React.useState(null);
    const isFocused = useIsFocused();  // variable used to refresh a list of events

    // Loading user data
    React.useEffect(() => {
      (async () => {
          if(isFocused){
            try {
                const data = await getUserData(Container.AVAIL_EVENTS);
                console.log(data)
                const parsedData = JSON.parse(data);
                setAvailEvents(parsedData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
          }
      })();
    }, [isFocused]);
    // show loading if user data not ready
    if (!availEvents) { return <LoadingIndicator/>; }
  
    function onUserEventPress(eventId){
        if(eventId){
            saveUserData(Container.AVAIL_ACTIVE_EVENT, availEvents.find(event => event.id === eventId));
        }
        else{
            saveUserData(Container.AVAIL_ACTIVE_EVENT, "");
        }
        navigation.navigate('Details')
    }

    function handleFavourite(id) {

    }

    return (
        <>
        <HeaderAuthorized navigation={navigation}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </HeaderAuthorized>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList data={availEvents}
                      renderItem={({item}) => (
                          <EventMiniAtendee
                              onPress={() => onUserEventPress(item.id)}
                              starOnPress{() => handleFavourite(item.id)}
                              eventData={item}
                          /> )
                      }
            />
        </View>
        </>
    );
}