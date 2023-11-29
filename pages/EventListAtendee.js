import * as React from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {HeaderAuthorized} from "../components/Headers";
import {EventMini} from "../components/Events";
import { Container } from "../utils/ContainerEnum";
import { useIsFocused } from '@react-navigation/native';
import colors from "../theme/Colors";
import { saveUserData, getUserData } from "../utils/Storage";

export function ListScreen({ navigation }) {
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
    if (!availEvents) { return <ActivityIndicator size="large" color={colors.primary} />; }
  
    function onUserEventPress(eventId){
        if(eventId){
            saveUserData(Container.AVAIL_ACTIVE_EVENT, availEvents.find(event => event.id === eventId));
        }
        else{
            saveUserData(Container.AVAIL_ACTIVE_EVENT, "");
        }
        navigation.navigate('Details')
    }

    return (
        <>
        <HeaderAuthorized navigation={navigation} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList data={availEvents}
                      renderItem={({item}) => (
                          <EventMini
                              onPress={() => onUserEventPress(item.id)}
                              eventData={item}
                          /> )
                      }
            />
        </View>
        </>
    );
}