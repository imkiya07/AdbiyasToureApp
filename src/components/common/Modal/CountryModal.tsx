import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {tCountryModalProp} from '@utils/types';
import countries from '@constants/countries.json';

const CountryModal: FC<tCountryModalProp> = ({
  visible,
  onSelectCountry,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <Text style={styles.title}>Select a Country</Text>
      <View style={styles.line} />
      <ScrollView>
        {countries.map((country, i) => (
          <TouchableOpacity
            style={[
              styles.pickerBtn,
              {backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#f6f6f6'},
            ]}
            key={country.name + country.code + i}
            onPress={() => onSelectCountry(country)}>
            <Text style={styles.countryName}>{country.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  );
};

export default CountryModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
    width: '100%',
  },
  pickerBtn: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  countryName: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
