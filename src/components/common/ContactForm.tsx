import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  PhoneNumberInput,
  getCountryByCode,
} from 'react-native-paper-phone-number-input';

const ContactForm = () => {
  // States to manage input data
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState<string>('BD');
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const {name, flag, dialCode} = getCountryByCode(countryCode);
  console.log('🚀 ~ ContactForm ~ dialCode:', dialCode);

  return (
    <>
      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <PhoneNumberInput
            code={countryCode}
            setCode={setCountryCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            // includeCountries={includeCountries}
            style={styles.phoneInput}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
  },
  phoneInput: {
    backgroundColor: '#F5F5F5',
    padding: 0,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default ContactForm;
