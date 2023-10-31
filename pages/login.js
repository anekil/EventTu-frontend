import * as React from 'react';
import { View, Text } from 'react-native';
import { PrimaryButton } from "../components/button";

export function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <PrimaryButton
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}