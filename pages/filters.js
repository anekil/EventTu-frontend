import React, {useState} from 'react';
import {Button, SafeAreaView, View, Text} from 'react-native';
import {FormText, FormView, SubmitButton} from "../components/form";
import DateTimePicker from '@react-native-community/datetimepicker';
// https://github.com/react-native-datetimepicker/datetimepicker

export function FiltersScreen({ navigation }) {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const handleFiltering = () => {

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{alignItems: 'center', justifyContent: 'center',}}>
                <FormText title="Choose filters"/>

                <FormText title="Date"/>

                <Button onPress={showDatepicker} title="Show date picker!" />
                <Button onPress={showTimepicker} title="Show time picker!" />
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}

                <FormText title="Location"/>

                <FormText title="Tags"/>

                <SubmitButton title="Filter" onPress={handleFiltering} />
            </FormView>
        </View>
    );
}