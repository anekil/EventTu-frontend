import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import { FormView, FormText, FormTextInput, FormLink } from "../components/form";
import colors from "../theme/colors";

export function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.extra_white, }}>
            <FormView>
                <FormText title="Login"/>
                <FormTextInput placeholder="Enter login" secureTextEntry={false} />
                <FormText title="Password" />
                <FormTextInput placeholder="Enter password" secureTextEntry={true} />
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <PrimaryButton style={{"marginTop": 20, "marginBottom": 10}} title="Login" onPress={() => navigation.navigate('Login')} />
                </View>
                <FormLink title="Don’t have an account yet?" onPress={() => navigation.navigate('Register')} />
                <FormLink title="Forgot your password?" />
            </FormView>
        </View>
    );
}