import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./pages/Home";
import { RegisterScreen } from "./pages/Register";
import { LoginScreen } from "./pages/Login";
import { MapScreen } from "./pages/Map";
import { HeaderButton } from "./components/Buttons";
import {FiltersScreen} from "./pages/Filters";
import {OrganizerEventsScreen} from "./pages/OrganizerEvents";
import {EventDetailsScreen} from "./pages/EventDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <HeaderButton title="EventTu" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Filters" component={FiltersScreen} />
              <Stack.Screen name="OrganizerEvents" component={OrganizerEventsScreen} />
              <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
