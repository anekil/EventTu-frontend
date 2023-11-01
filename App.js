import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./pages/home";
import { RegisterScreen } from "./pages/register";
import { LoginScreen } from "./pages/login";
import { MapScreen } from "./pages/map";
import { HeaderButton } from "./components/button";

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
          </Stack.Navigator>
      </NavigationContainer>
  );
}
