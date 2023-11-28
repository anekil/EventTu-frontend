import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { FormText, FormView } from "../components/FormElements";
import { PrimaryButton } from "../components/Buttons";
import colors from "../theme/Colors";
import { HeaderAppName } from "../components/Headers";
import { saveUserData, getUserData } from "../utils/Storage";
import { Container } from "../utils/ContainerEnum";
import { sendTo } from '../utils/Links';

export function ProfileScreen({ navigation }) {
    const [userLogin, setUserLogin] = React.useState(null);

    // Loading user data
    React.useEffect(() => {
        (async () => {
            try {
                const data = await getUserData(Container.LOGIN);
                setUserLogin(JSON.parse(data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    }, []);
    // show loading if user data not ready
    if (!userLogin) { return <ActivityIndicator size="large" color={colors.primary} />; }

    // reset user data and stack
    function resetStack() {
        saveUserData(Container.LOGIN, null);
        saveUserData(Container.ROLE, null);
        saveUserData(Container.OWNER_EVENTS, null);
        saveUserData(Container.OWNER_ACTIVE_EVENT, null);

        axios.post(sendTo("auth/logout"), {})
          .then(response => {
              console.log(response.data)
          })
          .catch(error => {
              console.log(error)
          });

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    }

    return (
        <>
            <HeaderAppName />
            <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
                <FormView>
                    <FormText title="Your profile" />
                    <FormText title={userLogin.name} />
                    <FormText title={userLogin.email} />
                    <PrimaryButton title={"Logout"} style={{ backgroundColor: colors.error }} onPress={resetStack} />
                </FormView>
            </View>
        </>
    );
}
