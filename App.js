import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./pages/Home";
import { RegisterScreen } from "./pages/Register";
import { LoginScreen } from "./pages/Login";
import { MapScreen } from "./pages/Map";
import { HeaderButton } from "./components/Buttons";
import {FiltersScreen} from "./pages/Filters";
import {OrganizerEventsScreen} from "./pages/OrganizerEvents";
import {EventDetailsScreen} from "./pages/EventDetails";
import {ListScreen} from "./pages/List";
import colors from "./theme/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMap} from "@fortawesome/free-solid-svg-icons/faMap";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";

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
            <Tab.Screen name="Map" component={MapScreen} options={{orientation: 'all', headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faMap } color={color}/>}}/>
            <Tab.Screen name="List" component={ListScreen} options={{orientation: 'all', headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faList } color={color}/>}}/>
        </Tab.Navigator>
    );
};

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} options={{orientation: 'all'}}/>
              <Stack.Screen name="Register" component={RegisterScreen} options={{orientation: 'all'}}/>
              <Stack.Screen name="Login" component={LoginScreen} options={{orientation: 'all'}}/>
              <Stack.Screen name="Browse Events" component={EventsNavigator} options={{orientation: 'all'}}/>
              <Stack.Screen name="Filters" component={FiltersScreen} options={{orientation: 'all'}}/>
              <Stack.Screen name="OrganizerEvents" component={OrganizerEventsScreen} options={{orientation: 'all'}}/>
              <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{orientation: 'all'}}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
