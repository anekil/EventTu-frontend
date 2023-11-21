import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FormText, FormView, SubmitButton, TagsPicker} from "../components/FormElements";
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton, PrimaryButton, TagChip} from "../components/Buttons";
// https://github.com/react-native-datetimepicker/datetimepicker
import Slider from '@react-native-community/slider';
import colors from "../theme/Colors";
// https://github.com/callstack/react-native-slider
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {Checkbox} from "expo-checkbox";

export function FiltersScreen({ navigation }) {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(fromDate);
    const [distance, setDistance] = React.useState(10);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [onlyFavourites, setOnlyFavourites] =  React.useState(false);

    const handleFiltering = () => {
        const filters = {
            "fromDate": fromDate.toLocaleString(),
            "toDate": toDate.toLocaleString(),
            "distance": distance,
            "selectedTags": selectedTags,
            "onlyFavourites": onlyFavourites
        };
        console.log(filters);
        navigation.navigate('Details');
    }

    const [minDate, setMinDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isFrom, setIsFrom] = useState(true)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if(isFrom){
            setFromDate(currentDate);
            if(toDate<fromDate)
                setToDate(fromDate);
        }
        else
            setToDate(currentDate);
        setShow(false);
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
        setMinDate(isFrom ? new Date() : fromDate);
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <ScrollView scrollEnabled={true} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{ width: '80%', marginTop: 40, marginBottom: 40 }}>
                <FormText title="Choose filters"/>

                <FormText title="Date"/>
                <View style={{flexDirection:"column"}}>
                    <FormText title="From"/>
                    <View style={ styles.propertyContainer }>
                        <IconButton icon={ faClock }
                                    onPress={()=>{
                                        setIsFrom(true);
                                        showTimepicker();
                                    }}  />
                        <Text>{fromDate.toLocaleTimeString()}</Text>
                        <IconButton icon={ faCalendar }
                                    onPress={()=>{
                                        setIsFrom(true);
                                        showDatepicker();
                                    }}  />
                        <Text>{fromDate.toLocaleDateString()}</Text>
                    </View>
                    <FormText title="To"/>
                    <View style={ styles.propertyContainer }>
                        <IconButton icon={ faClock }
                                    onPress={()=>{
                                        setIsFrom(false);
                                        showTimepicker();
                                    }}  />
                        <Text>{toDate.toLocaleTimeString()}</Text>
                        <IconButton icon={ faCalendar }
                                    onPress={()=>{
                                        setIsFrom(false);
                                        showDatepicker();
                                    }}  />
                        <Text>{toDate.toLocaleDateString()}</Text>
                    </View>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={isFrom ? fromDate : toDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        minimumDate={minDate}
                    />
                )}

                <FormText title="Location"/>
                <View style={ styles.propertyContainer }>
                    <Slider
                        style={{width: 200}}
                        value={distance}
                        onValueChange={newDist => setDistance(newDist)}
                        minimumValue={10}
                        maximumValue={50}
                        step={5}
                        minimumTrackTintColor={colors.primary_dark}
                        maximumTrackTintColor={colors.form_white}
                        thumbTintColor={colors.primary_light}
                    />
                    <Text>{ distance} km</Text>
                </View>

                <FormText title="Tags"/>
                <TagsPicker selectedTags={ selectedTags } setSelectedTags={ setSelectedTags } />

                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <FormText title="Only favourites "/>
                    <Checkbox
                        style={styles.checkbox}
                        value={onlyFavourites}
                        onValueChange={setOnlyFavourites}
                        color={ colors.extra_black }
                    />
                </View>

                <SubmitButton title="Filter" onPress={handleFiltering} />
            </FormView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    propertyContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
