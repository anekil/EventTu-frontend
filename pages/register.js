import * as React from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import { FormView, FormText, FormTextInput } from "../components/form";
import { InfoPopup } from '../components/modal';
import colors from "../theme/colors";

export function RegisterScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);

    const handleRegister = () => {
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

                <FormText title="email"/>
                <FormTextInput
                    placeholder="Enter email" 
                    secureTextEntry={false}
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />

                <FormText title="login"/>
                <FormTextInput
                    placeholder="Enter ligin"
                    secureTextEntry={false}
                    value={login} 
                    onChangeText={text => setLogin(text)}
                />

                <FormText title="password" />
                <FormTextInput
                    placeholder="Enter password" 
                    secureTextEntry={true}
                    value={password} 
                    onChangeText={text => setPassword(text)}
                />

                <FormText title="repeat password" />
                <FormTextInput 
                    placeholder="Enter repeated password"
                    secureTextEntry={true}
                    value={repeatPassword} 
                    onChangeText={text => setRepeatPassword(text)}
                />

                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <PrimaryButton style={{"marginTop": 20}} title="Register" onPress={handleRegister} />
                </View>

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                    info="Account creation Failed"
                />

            </FormView>
        </View>
    );
}