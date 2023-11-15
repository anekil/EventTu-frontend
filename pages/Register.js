import * as React from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FormView, FormText, FormTextInput, SubmitButton } from "../components/FormElements";
import { InfoPopup } from '../components/InfoModal';
import colors from "../theme/Colors";
import { sendTo } from '../utils/Links';
import { Role } from "../utils/RoleEnum";

export function RegisterScreen({ navigation }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [isFailurePopupVisible, setFailurePopupVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const { role } = useRoute().params;

    const validateRegister = (name, email, tel, password, repeatPassword) => {
        if(!name || !email || (role === Role.ORGANIZER && !tel) || !password || !repeatPassword){
            return { isOk: false, msg: "All fields are required" };
        }

        if (!email.includes('@')) {
            return { isOk: false, msg: "Email should contain '@'" };
        }
        
        if (role === Role.ORGANIZER && !/^\d{9}$/.test(tel)) {  // check only if organizer
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
            const request = {
                "name": name,
                "email": email,
                "telephone": tel,
                "password": password
            };
            if(role !== Role.ORGANIZER) delete request["telephone"];  // delete tel if not organizer

            console.log(request);
            console.log(sendTo(`auth/register/${role.toLowerCase()}`));

            axios.post(sendTo(`auth/register/${role.toLowerCase()}`), request)
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

                {role === Role.ORGANIZER && (
                    <>
                        <FormText title="telephone" />
                        <FormTextInput
                            placeholder="Enter tel" 
                            secureTextEntry={false}
                            value={tel} 
                            onChangeText={text => setTel(text)}
                        />
                    </>
                )}

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