import * as React from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { PrimaryButton } from "../components/button";
import {FormView, FormText, FormTextInput, SubmitButton} from "../components/form";
import { InfoPopup } from '../components/modal';
import colors from "../theme/colors";
import { sendTo } from '../utils/links';

export function RegisterScreen({ navigation }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const validateRegister = (name, email, tel, password, repeatPassword) => {
        if(!name || !email || !tel || !password || !repeatPassword){
            return { isOk: false, msg: "All fields are required" };
        }

        if (!email.includes('@')) {
            return { isOk: false, msg: "Email should contain '@'" };
        }
        
        if (!/^\d{9}$/.test(tel)) {
            return { isOk: false, msg: "Telephone number should be a 9-digit number" };
        }
    
        if (password.length < 8) {
            return { isOk: false, msg: "Password should be at least 8 characters long" };
        }
    
        if (password !== repeatPassword) {
            return { isOk: false, msg: "Password and repeated password do not match" };
        }
    
        return { isOk: true, msg: "Registration is valid" };
    }

    const handleRegister = () => {
        const { isOk, msg } = validateRegister(name, email, tel, password, repeatPassword);
        if(!isOk){
            setErrorMessage(msg)
            setFailurePopupVisible(true);
        }
        else{
            console.log("here");
            console.log(isOk);
            console.log(msg);
            axios.post(sendTo("register"), {
                "name": name,
                "email": email,
                "telephone": tel,
                "password": password
              })
              .then(response => {
                  console.log(response)
                  navigation.navigate('Login');
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.extra_white, }}>
            <FormView>

                <FormText title="name"/>
                <FormTextInput
                    placeholder="Enter Name"
                    secureTextEntry={false}
                    value={name} 
                    onChangeText={text => setName(text)}
                />

                <FormText title="email"/>
                <FormTextInput
                    placeholder="Enter email" 
                    secureTextEntry={false}
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />

                <FormText title="telephone" />
                <FormTextInput
                    placeholder="Enter tel" 
                    secureTextEntry={false}
                    value={tel} 
                    onChangeText={text => setTel(text)}
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

                <SubmitButton title="Register" onPress={handleRegister} />

                <InfoPopup
                    isVisible={isFailurePopupVisible}
                    onClose={closeFailurePopup}
                    info={errorMessage}
                />

            </FormView>
        </View>
    );
}