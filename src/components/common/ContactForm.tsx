import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import {
  PhoneNumberInput,
  getCountryByCode,
} from 'react-native-paper-phone-number-input';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {
  setCountryCode,
  setEmail,
  setPhoneNumber,
  setPostCode,
} from '@store/slice/bookingSlice';

const ContactForm: FC = () => {
  const {Email, PostCode} = useAppSelector(state => state.bookingSlice);
  const dispatch = useAppDispatch();

  // States to manage input data

  const [isoCode, setIsoCode] = useState<string>('BD');
  const [phoneState, setPhoneState] = useState<string>('');

  const {dialCode} = getCountryByCode(isoCode);

  dispatch(setCountryCode(dialCode));
  dispatch(setPhoneNumber(phoneState));

  return (
    <View style={styles.formContainer}>
      {/* Contact Information Section */}

      <View style={styles.emailContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={Email}
          onChangeText={e => dispatch(setEmail(e))}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.postCodeContainer}>
        <Text style={styles.label}>Post Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Post Code"
          value={PostCode}
          onChangeText={e => dispatch(setPostCode(e))}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <PhoneNumberInput
          code={isoCode}
          setCode={setIsoCode}
          phoneNumber={phoneState}
          setPhoneNumber={setPhoneState}
          // includeCountries={includeCountries}
          style={styles.phoneInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  emailContainer: {
    width: '55%',
  },
  postCodeContainer: {
    width: '40%',
  },
  inputContainer: {
    width: '100%',
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
