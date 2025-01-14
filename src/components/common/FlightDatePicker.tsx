import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

type tFlightDate = {
  initialValue: string;
  minimumValue?: Date;
  updateStateCb: (date: string) => void;
  placeholder: string;
};

const FlightDatePicker: FC<tFlightDate> = ({
  initialValue,
  minimumValue = new Date(),
  updateStateCb,
  placeholder,
}) => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    updateStateCb(date.toDateString());
    hideDatePicker();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateStateCb('');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          editable={false}
          onPress={showDatePicker}
          value={initialValue ?? ''}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={initialValue ? new Date(initialValue) : new Date()}
        minimumDate={minimumValue}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default FlightDatePicker;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
  },
});
