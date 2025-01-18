import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import countries from '@constants/countries.json';
import CountryModal from './Modal/CountryModal';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {
  setDateOfBirth,
  setGender,
  setNationalID,
  setPassengerFirstName,
  setPassengerLastName,
  setPassengerNationality,
  setPassengerTitle,
  setPassportCountry,
  setPassportExpiryDate,
  setPassportNumber,
} from '@store/slice/bookingSlice';
import {GenderList} from '@constants/radioList';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BookingForm = ({userIndx}: {userIndx: number}) => {
  const {PassengerName, Passport, PassengerNationality, Gender, DateOfBirth} =
    useAppSelector(state => state.bookingSlice.AirTravelers[userIndx]);
  const {PassengerTitle, PassengerFirstName, PassengerLastName} = PassengerName;
  const {PassportNumber, ExpiryDate, Country} = Passport;

  const dispatch = useAppDispatch();

  // States to manage input data
  const [issuedCountry, setIssuedCountry] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [countryModal, setCountryModal] = useState<boolean>(false);
  const [passportIssuedCountryModal, setPassportIssuedCountryModal] =
    useState<boolean>(false);

  const [toggleDobPicker, setToggleDobPicker] = useState<boolean>(false);
  const [toggleExpiryDatePicker, setToggleExpiryDatePicker] =
    useState<boolean>(false);

  useEffect(() => {
    if (Country) {
      countries.find(country => {
        if (country.code === Country) {
          setIssuedCountry(country.name);
        }
      });
    }

    if (PassengerNationality) {
      countries.find(country => {
        if (country.code === PassengerNationality) {
          setNationality(country.name);
        }
      });
    }

    return () => {
      setIssuedCountry('');
      setNationality('');
    };
  }, [Country, PassengerNationality]);

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
              value={PassengerTitle}
              onChangeText={e =>
                dispatch(setPassengerTitle({index: userIndx, value: e}))
              }
            />
          </View>
          <View style={styles.nameField}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={PassengerFirstName}
              onChangeText={e =>
                dispatch(setPassengerFirstName({index: userIndx, value: e}))
              }
            />
          </View>
        </View>

        <View className="w-full">
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={PassengerLastName}
            onChangeText={e =>
              dispatch(setPassengerLastName({index: userIndx, value: e}))
            }
          />
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            {GenderList.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setGender({index: userIndx, value: item.value}));
                }}
                key={item.label + index}
                style={styles.radioBtn}>
                <View style={styles.radioOuterCircle}>
                  <View
                    style={[
                      styles.radioInnerCircle,
                      {transform: [{scale: item.value === Gender ? 1 : 0}]},
                    ]}
                  />
                </View>
                <Text style={styles.radioTxt}>{item.label} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex flex-row justify-between items-center mb-4 w-full ">
          <View className="w-[47%]">
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => setToggleDobPicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select Date of Birth"
                placeholderTextColor="#666"
                editable={false}
                value={
                  DateOfBirth
                    ? dayjs(DateOfBirth).format('ddd MMM DD[,] YYYY')
                    : ''
                }
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={toggleDobPicker}
              mode="date"
              date={DateOfBirth ? new Date(DateOfBirth) : new Date()}
              maximumDate={new Date()}
              onConfirm={(selectedDate: Date) => {
                const formattedDate = dayjs(selectedDate).format(
                  'YYYY-MM-DD[T]HH:mm:ss',
                );
                if (selectedDate) {
                  dispatch(
                    setDateOfBirth({
                      index: userIndx,
                      value: formattedDate,
                    }),
                  );
                }
                setToggleDobPicker(false);
              }}
              onCancel={() => setToggleDobPicker(false)}
            />
          </View>
          <View className="w-[47%]">
            <Text style={styles.label}>Nationality</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setCountryModal(true);
              }}>
              <Text style={{color: '#666'}}>
                {nationality ? nationality : `Select Your Country`}
              </Text>
            </TouchableOpacity>
          </View>
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
            value={PassportNumber}
            onChangeText={e =>
              dispatch(setPassportNumber({index: userIndx, value: e}))
            }
          />
        </View>
        <View style={styles.passportField}>
          <Text style={styles.label}>Expiry Date</Text>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setToggleExpiryDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              placeholderTextColor="#666"
              editable={false}
              value={
                ExpiryDate ? dayjs(ExpiryDate).format('ddd MMM DD[,] YYYY') : ''
              }
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={toggleExpiryDatePicker}
            mode="date"
            date={ExpiryDate ? new Date(ExpiryDate) : new Date()}
            minimumDate={new Date()}
            maximumDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 10))
            }
            onConfirm={(selectedDate: Date) => {
              setToggleExpiryDatePicker(false);
              if (selectedDate) {
                const formattedDate = dayjs(selectedDate).format(
                  'YYYY-MM-DD[T]HH:mm:ss',
                );
                dispatch(
                  setPassportExpiryDate({
                    index: userIndx,
                    value: formattedDate,
                  }),
                );
              }
            }}
            onCancel={() => setToggleDobPicker(false)}
          />
        </View>
        <View className="w-full">
          <Text style={styles.label}>Issued Country</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setPassportIssuedCountryModal(true);
            }}>
            <Text style={{color: '#666'}}>
              {issuedCountry ? issuedCountry : `Select Passport Issued Country`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CountryModal
        visible={countryModal}
        onSelectCountry={e => {
          dispatch(setPassengerNationality({index: userIndx, value: e.code}));
          dispatch(setNationalID({index: userIndx, value: e.code}));
          setCountryModal(false);
        }}
        closeModal={() => setCountryModal(false)}
      />
      <CountryModal
        visible={passportIssuedCountryModal}
        onSelectCountry={e => {
          dispatch(setPassportCountry({index: userIndx, value: e.code}));
          setPassportIssuedCountryModal(false);
        }}
        closeModal={() => setPassportIssuedCountryModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    marginBottom: 15,
    padding: Platform.OS === 'ios' ? 15 : 0,
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
    width: '100%',
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
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
    width: '100%',
    height: 40,
  },
  passportField: {
    width: '48%',
  },
});

export default BookingForm;
