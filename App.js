import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./pages/Home";
import { RegisterScreen } from "./pages/AuthRegister";
import { LoginScreen } from "./pages/AuthLogin";
import { MapScreen } from "./pages/Map";
import {FiltersScreen} from "./pages/Filters";
import {OrganizerEventsScreen} from "./pages/EventListOrganizer";
import {EventDetailsScreen} from "./pages/EventEdit";
import {ListScreen} from "./pages/EventListAtendee";
import colors from "./theme/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMap} from "@fortawesome/free-solid-svg-icons/faMap";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {DetailsScreen} from "./pages/EventDetails";
import {ProfileScreen} from "./pages/Profile";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EventsNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.extra_black,
            tabBarActiveBackgroundColor: colors.primary_light,
            tabBarStyle: { borderTopWidth: 2, borderStyle: "solid", borderColor: colors.extra_black}
        }}>
            <Tab.Screen name="Map" component={MapScreen} options={{orientation: 'default', headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faMap } color={color}/>}}/>
            <Tab.Screen name="List" component={ListScreen} options={{orientation: 'default', headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faList } color={color}/>}}/>
        </Tab.Navigator>
    );
};

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="Register" component={RegisterScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="Login" component={LoginScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="Browse Events" component={EventsNavigator} options={{orientation: 'default'}}/>
              <Stack.Screen name="Filters" component={FiltersScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="Details" component={DetailsScreen} options={{orientation: 'default'}} />
              <Stack.Screen name="OrganizerEvents" component={OrganizerEventsScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{orientation: 'default'}}/>
              <Stack.Screen name="Profile" component={ProfileScreen} options={{orientation: 'default'}}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
