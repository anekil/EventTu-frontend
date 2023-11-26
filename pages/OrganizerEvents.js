import * as React from 'react';
import axios from 'axios';
import {FlatList, View, ActivityIndicator } from 'react-native';
import { FloatingButton } from "../components/Buttons"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {HeaderAuthorized} from "../components/Headers";
import {EventMini} from "../components/Event";
import ownerEventsExample from "../examples/ownerEventsExample.json";  // example content of events
import { saveUserData, getUserData } from "../utils/Storage";
import { Container } from "../utils/ContainerEnum";
import { sendTo } from '../utils/Links';
import colors from "../theme/Colors";

export function OrganizerEventsScreen({ navigation }) {
    const [ownerEvents, setOwnerEvents] = React.useState(null);

    // Loading user data
    React.useEffect(() => {
      (async () => {
          try {
              readEvents();
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      })();
    }, []);
    // show loading if user data not ready
    if (!ownerEvents) { return <ActivityIndicator size="large" color={colors.primary} />; }

    function readEvents(){
      axios.get(sendTo("events/owner"))
      .then(response => {
          console.log(response);
          saveUserData(Container.OWNER_EVENTS, JSON.stringify(response));
          setOwnerEvents(response);
      })
      .catch(error => {
          console.log(error);
          saveUserData(Container.OWNER_EVENTS, JSON.stringify(ownerEventsExample));
          console.log(typeof ownerEventsExample)
          setOwnerEvents(ownerEventsExample);
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
            <FlatList data={ownerEvents}
                      renderItem={({item}) => (
                          <EventMini
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