import * as React from 'react';
import axios from 'axios';
import {FlatList, View } from 'react-native';
import { FloatingButton } from "../components/Buttons"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {HeaderAuthorized} from "../components/Headers";
import {EventMiniOrganizer} from "../components/Events";
import { saveUserData } from "../utils/Storage";
import { Container } from "../utils/ContainerEnum";
import { sendTo } from '../utils/Links';
import { useIsFocused } from '@react-navigation/native';
import { LoadingIndicator } from '../components/LoadingIndicator';

export function OrganizerEventsScreen({ navigation }) {
    const [ownerEvents, setOwnerEvents] = React.useState(null);
    const isFocused = useIsFocused();  // variable used to refresh a list of events

    // Loading user data
    React.useEffect(() => {
      (async () => {
          if(isFocused){
            try {
                readEvents();
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
          }
      })();
    }, [isFocused]);
    // show loading if user data not ready
    if (!ownerEvents) { return <LoadingIndicator/>; }

    function readEvents(){
      axios.get(sendTo("events/owner"))
      .then(response => {
        console.log(response.data);
        saveUserData(Container.OWNER_EVENTS, JSON.stringify(response.data));
        setOwnerEvents(response.data);
      })
      .catch(error => {
          console.log(error);
      });
    }

    function onOwnerEventPress(eventId){
      if(eventId){
        saveUserData(Container.OWNER_ACTIVE_EVENT, ownerEvents.find(event => event.id === eventId));
      }
      else{
        saveUserData(Container.OWNER_ACTIVE_EVENT, "");
      }
      navigation.navigate('EventDetails')
    }

    return (
        <>
        <HeaderAuthorized navigation={navigation} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList style={{width: "90%"}}
                      data={ownerEvents}
                      renderItem={({item}) => (
                          <EventMiniOrganizer
                              onPress={() => onOwnerEventPress(item.id)}
                              eventData={item}
                          /> )
                      }
            />
            <FloatingButton icon={ faPlus } onPress={() => onOwnerEventPress(null)} />
        </View>
        </>
    );
}