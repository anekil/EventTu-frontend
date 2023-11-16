import {StyleSheet, View, Text, TextInput} from "react-native";
import * as React from "react";
import colors from "../theme/Colors";
import {PrimaryButton} from "./Buttons";
import MultiSelect from "react-native-multiple-select";
import {useEffect} from "react";
import {sendTo} from "../utils/Links";
import axios from "axios";

export const FormView = props => {
    return (
        <View style={{...styles.form, ...props.style}}>
            {props.children}
        </View>
    );
}

export const FormText = props => {
    return (
        <Text style={styles.text}>{props.title}</Text>
    );
}

export const FormTextInput = props => {
    return (
        <TextInput 
            style={styles.textInput}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
        >
            {props.children}
        </TextInput>
    );
}

export const FormMultiLineInput = props => {
    return (
        <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
        >
            {props.children}
        </TextInput>
    );
}

export const FormLink = props => {
    return (
        <Text style={styles.link} onPress={props.onPress}>{props.title}</Text>
    );
}

export const SubmitButton = props => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <PrimaryButton style={{"marginTop": 20, "marginBottom": 10}} title={props.title} onPress={props.onPress} />
        </View>
    );
}

export const TagsPicker = props => {
    const dummyTags = [{"id":1,"name":"tag1"},{"id":2,"name":"tag2"},{"id":3,"name":"tag3"},{"id":4,"name":"tag4"},{"id":5,"name":"tag5"},{"id":6,"name":"tag6"},{"id":7,"name":"tag7"},{"id":8,"name":"tag8"},{"id":9,"name":"tag9"},{"id":10,"name":"tag10"}]
    const [tags, setTags] = React.useState([]);

    useEffect(() => { getTags(); }, []);

    const getTags = () => {
        console.log(sendTo(`tags`));
        axios.get(sendTo(`tags`))
            .then(response => {
                setTags(response);
            })
            .catch(error => {
                console.log(error)
                setTags(dummyTags);
                console.log(tags);
            });
    }

    const onSelectedItemsChange = (selectedItems) => {
        props.setSelectedTags(selectedItems);
    };

    return (
      <>
          <MultiSelect
              uniqueKey="id"
              items={tags}
              selectedItems={props.selectedTags}
              selectText="Pick Tags"
              onSelectedItemsChange={onSelectedItemsChange}
              displayKey="name"
              tagBorderColor={colors.extra_black}
              tagTextColor={colors.extra_black}
              styleSelectorContainer={ styles.formTextInputLike }
              styleDropdownMenuSubsection={ styles.formTextInputLike }
          />
          {props.selectedTags && <Text>Selected: {props.selectedTags.join(', ')}</Text>}
      </>
    );
}

const styles = StyleSheet.create({
    form: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: colors.form_white,
        borderWidth: 3,
        borderColor: colors.extra_black,
    },
    text: {
        color: colors.extra_black,
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 10,
    },
    textInput: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.extra_white,
        marginBottom: 10,
    },
    link: {
        color: colors.primary_dark,
        textDecorationLine: 'underline',
        fontSize: 12,
    },
    formTextInputLike: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.extra_white,
    }
});
