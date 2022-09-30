import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon } from '@rneui/base';
import { showDeleteConfirmation } from '../../../../global/tools/show-alert';
import { ITransactionEntry } from '../../types/definitions';
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';


type Props = {
    item: ITransactionEntry;
}

const EntrySectionListItem: React.FC<Props> = ({ item }) => {

    const transactionEntryContext = useContext(TransactionEntryContext);
    
    const navigation = useNavigation();
    
    const { deleteEntry } = transactionEntryContext!
    
    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontSize: 18 }}>Clinical Date: {item.ClinicDate}</Text>
            <Text style={{ fontSize: 18 }}>Name of Ailment: {item.Nail}</Text>
            <Text style={{ fontSize: 18 }}>Medications prescribed: {item.Meds}</Text>
            <Text style={{ fontSize: 18 }}>Procedure Undertaken: {item.ProcUnder}</Text>
            <Text style={{ fontSize: 18 }}>Date of next Appointment: {item.DateApp}</Text>

            <ButtonGroup
                containerStyle={{ backgroundColor: 'pink', width: '40%', borderColor: 'pink' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="green"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => navigation.navigate("EditEntryScreen" as never,{transactionEntryToEdit: item} as never)}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="red"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            //deleteEntry(item.id!)
                            showDeleteConfirmation(
                                "About to Delete",
                                "Are you sure that you want to delete this entry?",
                                item.id!,
                                deleteEntry
                            )
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;