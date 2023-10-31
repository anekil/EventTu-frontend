import * as React from 'react';
import { View, Text } from 'react-native';
import { PrimaryButton } from "../components/button";

export function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <PrimaryButton
                title="Start"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}