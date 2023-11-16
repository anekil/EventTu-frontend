import * as React from 'react';
import axios from 'axios';
import {ScrollView, View} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FormView, FormText, FormTextInput, FormLink, SubmitButton } from "../components/FormElements";
import { InfoPopup } from '../components/InfoModal';
import colors from "../theme/Colors";
import { sendTo } from '../utils/Links';
import { Role } from "../utils/RoleEnum";

export function LoginScreen({ navigation }) {
    console.log("here");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const { role } = useRoute().params;

    const validateLogin = (email, password) => {
        if(!email || !password){
            return { isOk: false, msg: "All fields are required" };
        }
        if(!email.includes('@')) {
            return { isOk: false, msg: "Email should contains \'@\'" };
        }
        return { isOk: true, msg: "Login is valid" };
    }

    const handleLogin = () => {
        const { isOk, msg } = validateLogin(email, password);
        if(!isOk){
            setErrorMessage(msg)
            setFailurePopupVisible(true);
        }
        else{
            console.log("here");
            console.log(isOk);
            console.log(msg);
            axios.post(sendTo("auth/login"), {
                "email": email,
                "password": password,
              })
              .then(response => {
                  console.log(response)
                  navigation.navigate('Map');
              })
              .catch(error => {
                  console.log(error)
                  setErrorMessage(String(error))
                  setFailurePopupVisible(true);
              });
        }
        
    };

    const closeFailurePopup = () => {
        setFailurePopupVisible(false);
    };

    return (
        <ScrollView scrollEnabled={true} style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{ marginTop: 40, marginBottom: 40 }}>

                <FormText title="Email"/>
                <FormTextInput 
                    placeholder="Enter email" 
                    secureTextEntry={false} 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />

                <FormText title="Password" />
                <FormTextInput 
                    placeholder="Enter password" 
                    secureTextEntry={true} 
                    value={password} 
                    onChangeText={text => setPassword(text)}
                />

                <SubmitButton title="Login" onPress={handleLogin} />

                <FormLink title="Don’t have an account yet?" onPress={() => navigation.navigate('Register', {role: role})} />
                <FormLink title="Forgot your password?" />

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                    info={errorMessage}
                />

            </FormView>

            <SubmitButton title="Bypass" onPress={role === Role.ORGANIZER ? () => navigation.navigate('OrganizerEvents') : () => navigation.navigate('Browse Events')} />

        </ScrollView>
    );
}
