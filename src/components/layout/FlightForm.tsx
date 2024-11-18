import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useAppSelector} from '@utils/hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import PassengerModal from '@components/common/Modal/PassengerModal';
import axios from 'axios';

const FlightForm: FC = () => {
  const tripType = useAppSelector(state => state.flightTypeSlice.tripType);
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );
  // Convert Into RTK
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  // Active States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState<boolean>(false);

  const [multiCityList, setMultiCityList] = useState<
    {
      from: string;
      to: string;
      date: Date | null;
    }[]
  >([{from: '', to: '', date: null}]);

  const handleDepartureDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleReturnDateChange = (event: any, selectedDate?: Date) => {
    setShowReturnDatePicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const handleAddCity = () => {
    if (multiCityList.length < 3) {
      setMultiCityList([...multiCityList, {from: '', to: '', date: null}]);
    }
  };

  const handleMultiCityInputChange = (
    index: number,
    field: 'from' | 'to' | 'date',
    value: any,
  ) => {
    const updatedCities = [...multiCityList];
    updatedCities[index][field] = value;
    setMultiCityList(updatedCities);
  };

  let timeoutId: NodeJS.Timeout;

  return (
    <>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="From"
          placeholderTextColor="#666"
          onChangeText={value => {
            if (timeoutId || value === '') {
              clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(async () => {
              try {
                const response = await axios.get(
                  `https://fk-api.adbiyas.com/api/common/airports?size=25&search=${value}`,
                );
                const results = response.data;
                console.log(results.data);
              } catch (error) {
                console.warn('Error while fetching airports', error);
              }
            }, 1500);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="To"
          placeholderTextColor="#666"
        />

        {tripType === 'RoundTrip' && (
          <>
            <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Return Date"
                placeholderTextColor="#666"
                editable={false}
                value={returnDate ? returnDate.toDateString() : ''}
              />
            </TouchableOpacity>
            {showReturnDatePicker && (
              <DateTimePicker
                value={returnDate || new Date()}
                mode="date"
                display="default"
                onChange={handleReturnDateChange}
              />
            )}
          </>
        )}

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Departure"
            placeholderTextColor="#666"
            editable={false}
            value={departureDate ? departureDate.toDateString() : ''}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={departureDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDepartureDateChange}
          />
        )}

        <TouchableOpacity onPress={() => setShowPassengerModal(true)}>
          <TextInput
            style={styles.input}
            placeholder="Passenger"
            placeholderTextColor="#666"
            editable={false}
            value={`${adults} Adult, ${children} Children, ${infants} Infants, ${cabinClass}`}
          />
        </TouchableOpacity>
      </View>

      {tripType === 'MultiCity' &&
        multiCityList.map((city, index) => (
          <View key={index + 12} style={styles.multiCityInput}>
            <TextInput
              style={styles.input}
              placeholder={`From City ${index + 1}`}
              placeholderTextColor="#666"
              value={city.from}
              onChangeText={value =>
                handleMultiCityInputChange(index, 'from', value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder={`To City ${index + 1}`}
              placeholderTextColor="#666"
              value={city.to}
              onChangeText={value =>
                handleMultiCityInputChange(index, 'to', value)
              }
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Date"
                placeholderTextColor="#666"
                editable={false}
                value={city.date ? city.date.toDateString() : ''}
              />
            </TouchableOpacity>
          </View>
        ))}
      {tripType === 'MultiCity' && multiCityList.length < 3 && (
        <TouchableOpacity onPress={handleAddCity}>
          <Text style={styles.addCityText}>+ Add City</Text>
        </TouchableOpacity>
      )}
      {/* Passenger Modal */}
      <PassengerModal
        visible={showPassengerModal}
        onClose={() => setShowPassengerModal(false)}
      />
    </>
  );
};

export default FlightForm;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
  },
  multiCityInput: {
    marginBottom: 10,
  },
  addCityText: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
