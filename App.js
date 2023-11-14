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
            <Tab.Screen name="Map" component={MapScreen} options={{headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faMap } color={color}/>}}/>
            <Tab.Screen name="List" component={ListScreen} options={{headerShown: false, tabBarIcon: ({color}) => <FontAwesomeIcon icon={ faList } color={color}/>}}/>
        </Tab.Navigator>
    );
};

export default function App() {
  return (
      <NavigationContainer>
        <HeaderButton title="EventTu" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Browse Events" component={EventsNavigator} />
              <Stack.Screen name="Filters" component={FiltersScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
