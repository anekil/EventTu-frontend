import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FormText, FormView, SubmitButton, TagsPicker} from "../components/FormElements";
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton} from "../components/Buttons";
// https://github.com/react-native-datetimepicker/datetimepicker
import Slider from '@react-native-community/slider';
import colors from "../theme/Colors";
// https://github.com/callstack/react-native-slider
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";

import {DatePickerModal} from "react-native-paper-dates";
import {Checkbox} from "react-native-paper";

export function FiltersScreen({ navigation }) {

    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [distance, setDistance] = React.useState(10);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [onlyFavourites, setOnlyFavourites] =  React.useState(false);
    const [onlyFree, setOnlyFree] =  React.useState(false);

    const handleFiltering = () => {
        const filters = {
            "fromDate": range.startDate ? range.startDate.toLocaleString() : "",
            "toDate": range.endDate ? range.endDate.toLocaleString() : "",
            "distance": distance,
            "selectedTags": selectedTags,
            "onlyFavourites": onlyFavourites,
            "onlyFree": onlyFree
        };
        console.log(filters);
    }


    const [open, setOpen] = React.useState(false);

    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
        },
        [setOpen, setRange]
    );

    return (
        <ScrollView scrollEnabled={true} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormView style={{ width: '80%', marginTop: 40, marginBottom: 40 }}>
                <FormText title="Choose filters"/>

                <FormText title="Date"/>
                <View style={styles.propertyContainer}>
                    <IconButton icon={ faCalendar } onPress={() => setOpen(true)}  />
                    { range.startDate
                        ? <Text>{range.startDate.toLocaleDateString()} - {range.endDate.toLocaleDateString()}</Text>
                        : <></> }
                </View>

                <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onConfirm}
                />

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

                <View style={styles.propertyContainer}>
                    <FormText title="Only favourites "/>
                    <Checkbox
                        status={onlyFavourites ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setOnlyFavourites(!onlyFavourites);
                        }}
                        color={colors.extra_black}
                    />
                </View>

                <View style={styles.propertyContainer}>
                    <FormText title="Only free "/>
                    <Checkbox
                        status={onlyFree ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setOnlyFree(!onlyFree);
                        }}
                        color={colors.extra_black}
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
        alignItems: 'center'
    }
});
