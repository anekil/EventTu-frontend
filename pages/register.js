import * as React from 'react';
import { View, Text } from 'react-native';
import { PrimaryButton } from "../components/button";

export function RegisterScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Register Screen</Text>
            <PrimaryButton
                title="Register"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}