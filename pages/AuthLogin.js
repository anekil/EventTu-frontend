import * as React from 'react';
import axios from 'axios';
import {ScrollView } from 'react-native';
import { FormView, FormText, FormTextInput, FormLink, SubmitButton } from "../components/FormElements";
import { InfoPopup } from '../components/InfoModal';
import { sendTo } from '../utils/Links';
import { Role } from "../utils/RoleEnum";
import { Container } from "../utils/ContainerEnum";
import { saveUserData, getUserData } from "../utils/Storage";
import { LoadingIndicator } from '../components/LoadingIndicator';

export function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('test@test.com');
    const [password, setPassword] = React.useState('test');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [role, setRole] = React.useState(null);

    // Loading user data
    React.useEffect(() => {
        (async () => {
            try {
                const data = await getUserData(Container.ROLE);
                setRole(JSON.parse(data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    }, []);
    // show loading if user data not ready
    if (!role) { return <LoadingIndicator/>; }

    // TODO: Will be deleted when connection between front and back will work
    const dummyUserLogin = {
        "id": 0,
        "name": "Janusz_" + String(Math.random()),
        "email": "Janusz@gmail.com",
        "telephone": "123456789"
    };

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
                  saveUserData(Container.LOGIN, response.data);
                  role === Role.ORGANIZER ? navigation.navigate('OrganizerEvents') : navigation.navigate('Browse Events');
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

    function redirect(){
        saveUserData(Container.LOGIN, dummyUserLogin);
        role === Role.ORGANIZER ? navigation.navigate('OrganizerEvents') : navigation.navigate('Browse Events');
    }

    return (
        <ScrollView scrollEnabled={true} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
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

                <FormLink title="Don’t have an account yet?" onPress={() => navigation.navigate('Register')} />
                <FormLink title="Forgot your password?" />

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                    info={errorMessage}
                    iconType="times-circle"
                    iconColor="red"
                />

            </FormView>
        </ScrollView>
    );
}
