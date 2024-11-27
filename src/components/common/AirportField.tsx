import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
} from 'react-native';
import React, {FC, useState} from 'react';
import axios from 'axios';
import {tAirport, tFlightForm} from '@utils/types';

const AirportField: FC<tFlightForm> = ({
  selectedAirport,
  selectedAirportCb,
  title,
}) => {
  let timeoutId: NodeJS.Timeout;
  const [searchedAirport, setSearchedAirport] = useState<tAirport[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isBlank, setIsBlank] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor="#666"
        value={inputValue}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            selectedAirportCb({
              iata: '',
              city: '',
              country: '',
              name: '',
            });
            clearTimeout(timeoutId);
            setIsBlank(true);
            setSearchedAirport([]);
          }
        }}
        onChangeText={value => {
          setInputValue(value);

          // If there is a timeoutId or the input is empty, clear the timeout
          if (timeoutId || value === '') {
            clearTimeout(timeoutId);
          }

          // If the input is not empty and there is no selected airport, fetch the airports
          if (isBlank && selectedAirport === '') {
            console.debug('fetching', value);
            timeoutId = setTimeout(async () => {
              try {
                const response = await axios.get(
                  `https://fk-api.adbiyas.com/api/common/airports?size=25&search=${value}`,
                );
                const results = response.data.data;
                console.log('🚀 ~ timeoutId=setTimeout ~ results:', results);
                setSearchedAirport(results);
              } catch (error) {
                console.warn('Error while fetching airports', error);
              }
            }, 1500);
          }
        }}
      />
      {searchedAirport?.length > 0 && (
        <ScrollView
          style={styles.dropdown}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          {searchedAirport?.map(airport => (
            <TouchableOpacity
              onPress={() => {
                selectedAirportCb({
                  iata: airport.iata,
                  city: airport.city,
                  country: airport.country,
                  name: airport.name,
                });
                setInputValue(
                  `${airport.name} - ${airport.city}, ${airport.country}`,
                );
                setSearchedAirport([]);
                setIsBlank(false);
              }}
              key={airport.id}
              style={styles.input}>
              <Text>
                {airport.name} - {airport.city}, {airport.country}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AirportField;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    zIndex: 5,
    maxHeight: 200,
  },
});
