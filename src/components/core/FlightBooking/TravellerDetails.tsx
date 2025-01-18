import TravelerAccordion from '@components/common/Accordions';
import ContactForm from '@components/common/ContactForm';
import {useFocusEffect} from '@react-navigation/native';
import {resetBookingForm} from '@store/slice/bookingSlice';
import {resetFlightState} from '@store/slice/flightDestinations';
import {resetSearchResults} from '@store/slice/flightResults';
import {resetTripState} from '@store/slice/flightType';
import {resetPassengerState} from '@store/slice/passengerSlice';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {tTravelerDetailsScreenProps} from '@utils/types';
import axios from 'axios';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  BackHandler,
} from 'react-native';
import {BASE_URL} from '@env';

const TravelerDetailsScreen: FC<tTravelerDetailsScreenProps> = ({
  navigation,
}) => {
  const formBody = useAppSelector(state => state.bookingSlice);
  const {AirTravelers, CountryCode, PhoneNumber, Email, PostCode} = formBody;
  const dispatch = useAppDispatch();
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    const validContactDetails =
      CountryCode.length > 0 &&
      PhoneNumber.length > 0 &&
      Email.length > 0 &&
      PostCode.length > 0;

    const validTravelers =
      AirTravelers.length > 0 &&
      AirTravelers.every(traveler => {
        const {PassengerName, DateOfBirth, Passport, PassengerNationality} =
          traveler;
        return (
          PassengerName.PassengerTitle.length > 0 &&
          PassengerName.PassengerFirstName.length > 0 &&
          PassengerName.PassengerLastName.length > 0 &&
          DateOfBirth.length > 0 &&
          Passport.PassportNumber.length > 0 &&
          Passport.ExpiryDate.length > 0 &&
          Passport.Country.length > 0 &&
          PassengerNationality.length > 0
        );
      });

    if (validContactDetails && validTravelers) {
      setValidForm(true);
    }

    return () => {
      setValidForm(false);
    };
  }, [AirTravelers, CountryCode, PhoneNumber, Email, PostCode]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(resetBookingForm());
        return false; // Return false to allow the default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [dispatch]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <ContactForm />
        <Text style={styles.sectionTitle}>Passenger Information</Text>
        <TravelerAccordion />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={async () => {
            if (validForm) {
              // Integrate with your booking API here

              const formData = {...formBody};
              const toUpperCaseDeep = (obj: any): any => {
                if (typeof obj === 'string') {
                  const convertedValue = obj.toUpperCase();
                  if (convertedValue.includes('.')) {
                    return convertedValue.replace(/\./g, '');
                  } else {
                    return convertedValue;
                  }
                } else if (Array.isArray(obj)) {
                  return obj.map(toUpperCaseDeep);
                } else if (typeof obj === 'object' && obj !== null) {
                  return Object.keys(obj).reduce((acc, key) => {
                    acc[key] = toUpperCaseDeep(obj[key]);
                    return acc;
                  }, {} as any);
                }
                return obj;
              };

              formData.AirTravelers = formData.AirTravelers.map(
                (traveler: any) => toUpperCaseDeep(traveler),
              );
              formData.CountryCode = formData.CountryCode.toUpperCase();
              formData.PhoneNumber = formData.PhoneNumber.toUpperCase();
              formData.Email = formData.Email.toUpperCase();
              formData.PostCode = formData.PostCode.toUpperCase();

              console.debug(
                'API:',
                BASE_URL + '/booking',
                '~ payload: ',
                formData,
                formData.AirTravelers[0].PassengerName,
                formData.AirTravelers[0].Passport,
              );

              try {
                const response = await axios.post(
                  BASE_URL + '/booking',
                  formData,
                );
                console.log('🚀 ~ searchFlight ~ response:', response);
                Alert.alert(
                  'Thank You!',
                  `Your Booking Request was successfully received. \n\n Thank you!`,
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        // Redirect to Home Page
                        dispatch(resetBookingForm());
                        dispatch(resetFlightState());
                        dispatch(resetSearchResults());
                        dispatch(resetTripState());
                        dispatch(resetPassengerState());
                        setTimeout(() => {
                          navigation.navigate('MainTabs');
                        }, 500);
                      },
                    },
                  ],
                );
              } catch (error: any) {
                Alert.alert(
                  'Sorry!',
                  `Something went wrong while processing your booking request. \nPlease Try Again Later! \n\nThank you!`,
                );
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.debug(error.response.data);
                  console.debug(error.response.status);
                  console.debug(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.debug(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.debug(
                    'Something happened in setting up the request that triggered an Error',
                    error.message,
                  );
                }
                console.debug(error.config);
              }
            } else {
              Alert.alert(
                'Missing Information!',
                `Please fill in all fields of each traveler and contact information. \n\n Thank you!`,
              );
            }
          }}
          style={[
            styles.button,
            {
              backgroundColor: validForm ? '#009FFD' : '#C4C4C4',
            },
          ]}>
          <Text style={styles.buttonText}>Proceed to Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TravelerDetailsScreen;
