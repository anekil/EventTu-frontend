import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {FormText, FormView, SubmitButton} from "../components/FormElements";
import DateTimePicker from '@react-native-community/datetimepicker';
import {PrimaryButton, TagChip} from "../components/Buttons";
// https://github.com/react-native-datetimepicker/datetimepicker
import Slider from '@react-native-community/slider';
import colors from "../theme/Colors";
// https://github.com/callstack/react-native-slider

export function FiltersScreen({ navigation }) {

    const [date, setDate] = useState(new Date());
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
                <PrimaryButton onPress={showDatepicker} title="Show date picker!" />
                <PrimaryButton onPress={showTimepicker} title="Show time picker!" />
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
                <Slider
                    style={{width: 200}}
                    minimumValue={10}
                    maximumValue={50}
                    step={5}
                    minimumTrackTintColor={colors.primary_dark}
                    maximumTrackTintColor={colors.form_white}
                    thumbTintColor={colors.primary_light}
                />

                <FormText title="Tags"/>
                <PrimaryButton title={"+"} />
                <TagChip title={"Tag"} />


                <SubmitButton title="Filter" onPress={handleFiltering} />
            </FormView>
        </View>
    );
}