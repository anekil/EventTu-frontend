import * as React from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import { FormView, FormText, FormTextInput, FormLink } from "../components/form";
import { InfoPopup } from '../components/modal';
import colors from "../theme/colors";

export function LoginScreen({ navigation }) {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);

    const handleLogin = () => {
        axios.post('www-placeholder', {
          login,
          password,
        })
        .then(response => {
            navigation.navigate('Map');
        })
        .catch(error => {
            setFailurePopupVisible(true);
        });
    };

    const closeFailurePopup = () => {
        setFailurePopupVisible(false);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.extra_white, }}>
            <FormView>

                <FormText title="Login"/>
                <FormTextInput 
                    placeholder="Enter login" 
                    secureTextEntry={false} 
                    value={login} 
                    onChangeText={text => setLogin(text)}
                />

                <FormText title="Password" />
                <FormTextInput 
                    placeholder="Enter password" 
                    secureTextEntry={true} 
                    value={password} 
                    onChangeText={text => setPassword(text)}
                />

                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <PrimaryButton style={{"marginTop": 20, "marginBottom": 10}} title="Login" onPress={handleLogin} />
                </View>

                <FormLink title="Don’t have an account yet?" onPress={() => navigation.navigate('Register')} />
                <FormLink title="Forgot your password?" />

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                />

            </FormView>
        </View>
    );
}
