import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type tFlightDate = {
  initialValue: Date;
  minimumValue?: Date;
  updateStateCb: (date: Date) => void;
  placeholder: string;
};

const FlightDatePicker: FC<tFlightDate> = ({
  initialValue,
  minimumValue = new Date(),
  updateStateCb,
  placeholder,
}) => {
  const [toggleDatePicker, setToggleDatePicker] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity onPress={() => setToggleDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          editable={false}
          value={initialValue.toDateString()}
        />
      </TouchableOpacity>
      {toggleDatePicker && (
        <DateTimePicker
          value={initialValue}
          mode="date"
          display="default"
          minimumDate={minimumValue}
          onChange={(
            event: DateTimePickerEvent,
            selectedDate: Date | undefined,
          ) => {
            setToggleDatePicker(false);
            if (selectedDate) {
              updateStateCb(selectedDate);
            }
          }}
        />
      )}
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
