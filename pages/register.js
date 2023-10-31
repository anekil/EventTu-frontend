import * as React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import { FormView, FormText, FormTextInput } from "../components/form";
import colors from "../theme/colors";

export function RegisterScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.extra_white, }}>
            <FormView>
                <FormText title="email"/>
                <FormTextInput placeholder="Enter email" secureTextEntry={false} />
                <FormText title="login"/>
                <FormTextInput placeholder="Enter ligin" secureTextEntry={false} />
                <FormText title="password" />
                <FormTextInput placeholder="Enter password" secureTextEntry={true} />
                <FormText title="repeat password" />
                <FormTextInput placeholder="Enter repeated password" secureTextEntry={true} />
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <PrimaryButton style={{"marginTop": 20}} title="Register" onPress={() => navigation.navigate('Login')} />
                </View>
            </FormView>
        </View>
    );
}