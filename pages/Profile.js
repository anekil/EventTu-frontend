import * as React from 'react';
import {View} from 'react-native';
import {FormText, FormView} from "../components/FormElements";
import {PrimaryButton} from "../components/Buttons";
import colors from "../theme/Colors";
import {HeaderAppName} from "../components/Headers";

export function ProfileScreen({ navigation }) {

    return (
        <>
        <HeaderAppName />
        <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
           <FormView>
               <FormText title="Your profile" />
               <FormText title="Your email" />
               <FormText title="example@email.com" />

               <PrimaryButton title={"Logout"} style={{backgroundColor: colors.error}} onPress={() => navigation.navigate("Home")} />
           </FormView>
        </View>
        </>
    );
}