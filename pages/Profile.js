import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; // Import ActivityIndicator for loading indication
import { CommonActions } from '@react-navigation/native';
import { FormText, FormView } from "../components/FormElements";
import { PrimaryButton } from "../components/Buttons";
import colors from "../theme/Colors";
import { HeaderAppName } from "../components/Headers";
import { saveUserCredentials, getUserCredentials } from "../utils/Storage";

export function ProfileScreen({ navigation }) {
    const [userCreds, setUserCreds] = React.useState(null);

    // Loading user credentials
    React.useEffect(() => {
        const fetchUserCredentials = async () => {
            try {
                const creds = await getUserCredentials();
                setUserCreds(JSON.parse(creds));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserCredentials();
    }, []);

    // reset user data and stack
    function resetStack() {
        saveUserCredentials(null);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    }

    // show loading if user data not ready
    if (!userCreds) { return <ActivityIndicator size="large" color={colors.primary} />; }

    return (
        <>
            <HeaderAppName />
            <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
                <FormView>
                    <FormText title="Your profile" />
                    {userCreds && (
                        <>
                            <FormText title={userCreds.name} />
                            <FormText title={userCreds.email} />
                        </>
                    )}
                    <PrimaryButton title={"Logout"} style={{ backgroundColor: colors.error }} onPress={resetStack} />
                </FormView>
            </View>
        </>
    );
}
