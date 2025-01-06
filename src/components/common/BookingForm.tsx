import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

const radioItemList: string[] = ['male', 'female'];

const BookingForm = () => {
  // States to manage input data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<string>(radioItemList[0]);
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');

  const [toggleDatePicker, setToggleDatePicker] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDateOfBirth('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.nameContainer}>
          <View style={styles.titleField}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Mr. / Mrs. / Ms."
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.nameField}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            {radioItemList.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setGender(item);
                }}
                key={item + index}
                style={styles.radioBtn}>
                <View style={styles.radioOuterCircle}>
                  <View
                    style={[
                      styles.radioInnerCircle,
                      {transform: [{scale: item === gender ? 1 : 0}]},
                    ]}
                  />
                </View>
                <Text style={styles.radioTxt}>{item} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setToggleDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select Date of birth"
              placeholderTextColor="#666"
              editable={false}
              value={dateOfBirth}
            />
          </TouchableOpacity>
          {toggleDatePicker && (
            <DateTimePicker
              value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(
                event: DateTimePickerEvent,
                selectedDate: Date | undefined,
              ) => {
                setToggleDatePicker(false);
                if (selectedDate) {
                  setDateOfBirth(selectedDate.toDateString());
                }
              }}
            />
          )}
        </View>
      </View>

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
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Passport Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passport Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Passport Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter passport number"
            value={passportNumber}
            onChangeText={setPassportNumber}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  titleField: {
    width: '35%',
  },
  nameField: {
    width: '61%',
  },
  radioGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    alignItems: 'center',
  },
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '45%',
  },
  radioOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    borderColor: '#CCC',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#10A5F9',
  },
  radioTxt: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
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
    width: '100%',
  },
});

export default BookingForm;
