import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import airports from '@constants/airports.json';
import {tAirport, tFlightForm} from '@utils/types';
import {useNavigation} from '@react-navigation/native';

const AirportField: FC<tFlightForm> = ({
  selectedAirport,
  selectedAirportCb,
  title,
}) => {
  const [searchedAirport, setSearchedAirport] = useState<tAirport[]>([]);
  const [inputValue, setInputValue] = useState<string>(selectedAirport);
  const [isBlank, setIsBlank] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setInputValue('');
      setSearchedAirport([]);
      setIsBlank(true);
    });

    return unsubscribe;
  }, [navigation]);

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
            setIsBlank(true);
            setSearchedAirport([]);
          }
        }}
        onChangeText={value => {
          setInputValue(value);

          // If there is a timeoutId or the input is empty, clear the timeout

          // If the input is not empty and there is no selected airport, fetch the airports
          if (isBlank && selectedAirport === '') {
            // console.debug('fetching', value);

            if (value.length > 0) {
              const searchTxt = value.trim().toLowerCase();
              const results = airports.filter(
                ({name, city, country, iata}) =>
                  name.toLowerCase().includes(searchTxt) ||
                  city.toLowerCase().includes(searchTxt) ||
                  iata.toLowerCase().includes(searchTxt) ||
                  country.toLowerCase().includes(searchTxt),
              );
              setSearchedAirport(results);
            } else {
              setSearchedAirport([]);
            }
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
