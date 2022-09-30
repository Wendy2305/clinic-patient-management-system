import React, { useContext, useState } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { AssetEntryContext } from '../../contexts/Contexts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AssetEntry } from '../../entities/biodata-entry.entity';
import moment from 'moment';

/**
 * Type for state variable for the form
 */
type IState = {
    id: number,
    acquireDay: number | null;
    acquireMonth: number | null;
    acquireYear: number | null;
    date: Date;
    FName: string;
    SName:string;
    MName:string;
    DOBi: number;
    Hadd: string;
    DateReg: string;
    Matno: string;
    SN?: number;
}

const EditEntry: React.FC = () => {

    const { updateEntry } = useContext(AssetEntryContext)!;

    //const route = useRoute();
    //below is the right declaration for TypeScript but looks complicated.
    const route = useRoute<RouteProp<Record<string, { assetEntryToEdit: AssetEntry }>>>();
    const assetEntryToEdit = route.params.assetEntryToEdit;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        id: assetEntryToEdit.id,
        acquireDay: assetEntryToEdit.acquireDay,
        acquireMonth: assetEntryToEdit.acquireMonth,
        acquireYear: assetEntryToEdit.acquireYear,
        date: new Date(assetEntryToEdit.acquireYear, assetEntryToEdit.acquireMonth, assetEntryToEdit.acquireDay),
        FName: assetEntryToEdit.FName,
        SName: assetEntryToEdit.SName,
        MName: assetEntryToEdit.MName,
        DOBi: assetEntryToEdit.DOBi,
        Hadd: assetEntryToEdit.Hadd,
        DateReg: assetEntryToEdit.DateReg,
        Matno: assetEntryToEdit.Matno,
        
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text h3 style={styles.inputContainerStyle}>Edit Personal Bio-Data</Text>
                {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
                <View style={[styles.inputContainerStyle, { flexDirection: 'row', alignSelf: 'flex-start' }]}>
                    {Platform.OS !== "ios" && <Button
                        radius={6}
                        title={moment(state.date).format("LL")}
                        onPress={() => {
                            setShowDatePicker(true);
                        }}
                    />}
                    {showDatePicker && <DateTimePicker
                        style={styles.inputContainerStyle}
                        value={state.date}
                        mode={'date'}
                        //is24Hour={true}
                        display="default"
                        onChange={(_event: any, selectedDate: any) => {
                            const date: Date = selectedDate as Date;
                            setState({
                                ...state,
                                date: selectedDate,
                                acquireDay: date.getDate(),
                                acquireMonth: date.getMonth(),
                                acquireYear: date.getFullYear()
                            })
                            setShowDatePicker(Platform.OS === "ios" ? true : false);
                        }}
                    />}
                </View>
                {/** 
                <CheckBox
                    title='Income?'
                    containerStyle={[styles.inputContainerStyle, { marginTop: 10 }]}
                    checked={!state.expense}
                    onPress={() => { setState({ ...state, expense: !state.expense }) }}
                    style={styles.inputStyle}
                />
                */}
                <Input
                    label="First Name"
                    placeholder="Enter First Name here"
                    multiline
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={FName => setState({ ...state, FName })}
                    style={styles.inputStyle}
                />

                <Input
                    label="Surname"
                    placeholder="Enter Surname here"
                    multiline
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={SName => setState({ ...state, SName })}
                    style={styles.inputStyle}
                />

                <Input
                    label="Middle Name"
                    placeholder="Enter Middle Name here"
                    multiline
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={MName => setState({ ...state, MName })}
                    style={styles.inputStyle}
                />

                <Input
                    label="Date of Birth"
                    placeholder="Enter Date of Birth here"
                    keyboardType="numeric"
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'money' }}
                    onChangeText={DOBi => setState({ ...state, DOBi: +DOBi })}
                    style={styles.inputStyle}
                />

                <Input
                    label="Home Address"
                    placeholder="Enter Home Address here"
                    multiline
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={Hadd => setState({ ...state, Hadd })}
                    style={styles.inputStyle}
                />

                <Input
                    label="Date of Registration"
                    placeholder="Enter Date of Registration here"
                    keyboardType="numeric"
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'money' }}
                    onChangeText={DateReg => setState({ ...state, DateReg})}
                    style={styles.inputStyle}
                />

                <Input
                    label="Matric Number"
                    placeholder="Enter Mat no here"
                    keyboardType="numeric"
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={{ type: 'font-awesome', name: 'money' }}
                    onChangeText={Matno => setState({ ...state, Matno  })}
                    style={styles.inputStyle}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                        title="Save"
                        onPress={() => {
                            //call create which will also make the form disappear
                            //remove date before sending because it is not in the AssetEntry table. Only the breakdown day, month, year are there
                            const { date, ...updatedAssetEntryData } = state;
                            updateEntry(updatedAssetEntryData, navigation);
                        }}
                    /><Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                        title="Cancel"
                        onPress={() => {
                            //call create which will also make the form disappear
                            navigation.goBack();
                        }}
                        buttonStyle={{ backgroundColor: 'orange' }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 18
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2'
    },
    inputStyle: {
        backgroundColor: '#F2F3F5',
        borderRadius: 6,
        height: '100%',
        padding: 6
    }
});

export default EditEntry;