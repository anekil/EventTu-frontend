import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from "./pages/register";
import { HomeScreen } from "./pages/home";
import colors from "./theme/colors";
import { HeaderButton } from "./components/header-button";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <HeaderButton title="EventTu" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={RegisterScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

screenOptions = {
    "headerStyle": {
        "backgroundColor": colors.primary_dark,
        "borderWidth": 2,
        "margin": 5,
    },
    "headerTitleStyle": {
        "color": colors.extra_white,
    },
    "headerTitleAlign": 'center'
}
