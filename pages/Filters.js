import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FormText, FormView, SubmitButton, TagsPicker} from "../components/FormElements";
import {IconButton} from "../components/Buttons";
import Slider from '@react-native-community/slider';
import colors from "../theme/Colors";
// https://github.com/callstack/react-native-slider
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";

import {DatePickerModal} from "react-native-paper-dates";
import {Checkbox} from "react-native-paper";
import {getFilters, resetFilters, saveFilters} from "../utils/Storage";
import * as Location from "expo-location";
import {LoadingIndicator} from "../components/LoadingIndicator";
import {faRefresh} from "@fortawesome/free-solid-svg-icons/faRefresh";

export function FiltersScreen({ navigation }) {

    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [distance, setDistance] = React.useState(2);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [onlyFree, setOnlyFree] =  React.useState(false);

    useEffect(() => {
        (async () => loadFilters())();
    }, []);

    const loadFilters = async() => {
        let filters = await getFilters();
        console.log("filters" + filters);
        filters = JSON.parse(filters);
        setDistance(filters["radius"]);
        setSelectedTags(filters["tags"]);
        setOnlyFree(filters["isFree"]);
        setRange({
            startDate: new Date(filters["startDate"]),
            endDate: new Date(filters["endDate"])
        })
    }

    const handleFiltering = async () => {
        const filters = {
            "startDate": range.startDate,
            "endDate": range.endDate,
            "radius": distance,
            "tags": selectedTags,
            "isFree": onlyFree
        };
        console.log(filters);
        await saveFilters(filters);
        navigation.goBack();
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
                <View style={styles.propertyContainer}>
                    <FormText title="Choose filters"/>
                    <IconButton icon={ faRefresh } onPress={() => resetFilters().then(() => loadFilters())} />
                </View>

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
                        minimumValue={2}
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
