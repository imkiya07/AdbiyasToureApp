import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

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
  const [toggleDatePicker, setToggleDatePicker] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateStateCb('');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <TouchableOpacity onPress={() => setToggleDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          editable={false}
          value={initialValue ?? ''}
        />
      </TouchableOpacity>
      {toggleDatePicker && (
        <DateTimePicker
          value={new Date(initialValue)}
          mode="date"
          display="default"
          minimumDate={minimumValue}
          onChange={(
            event: DateTimePickerEvent,
            selectedDate: Date | undefined,
          ) => {
            setToggleDatePicker(false);
            if (selectedDate) {
              updateStateCb(selectedDate.toDateString());
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
