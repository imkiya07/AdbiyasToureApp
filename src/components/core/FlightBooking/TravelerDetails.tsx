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
import * as Sentry from '@sentry/react-native';

const apiUrl = BASE_URL + '/booking';

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
              Sentry.addBreadcrumb({
                category: 'API Logging',
                type: 'info',
                message: 'Clone the formBody store for API request to formData',
                level: 'info',
              });
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

              Sentry.addBreadcrumb({
                category: 'API Logging',
                type: 'info',
                message: 'Formatted the formData store for API request',
                level: 'info',
              });

              try {
                Sentry.addBreadcrumb({
                  category: 'API Logging',
                  type: 'info',
                  message: 'Creating a Flight Booking Request',
                  level: 'debug',
                  data: {
                    apiEndPoint: apiUrl,
                    formData,
                    AirTravelers: formData.AirTravelers,
                  },
                });
                const response = await axios.post(apiUrl, formData);
                Sentry.addBreadcrumb({
                  category: 'API Logging',
                  type: 'info',
                  message: 'Flight Booking Request Successful',
                  level: 'debug',
                  data: {...response},
                });
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
                        Sentry.captureEvent({
                          message: 'Booking Request Successful',
                          level: 'info',
                          extra: {...response},
                        });
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
                  // console.debug(error.response.data);
                  // console.debug(error.response.status);
                  // console.debug(error.response.headers);
                  Sentry.addBreadcrumb({
                    category: 'API Error',
                    type: 'Error',
                    message: 'Flight booking Error with Response',
                    level: 'error',
                    data: {...error.response},
                  });
                  Sentry.captureException(error.response.data.message, {
                    level: 'fatal',
                    extra: {
                      status: error.response.status,
                      data: error.response.data,
                      headers: error.response.headers,
                    },
                  });
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.debug(error.request);
                  if (error.message === 'Network Error') {
                    Alert.alert(
                      'Error',
                      'It Appear you have Internet issue! \nPlease Check your Internet and Try Again.\n Thank You!',
                    );
                    Sentry.addBreadcrumb({
                      category: 'API Error',
                      type: 'Warn',
                      message: 'Flight search Network Error',
                      level: 'warning',
                      data: {...error},
                    });
                    Sentry.captureException(error.message, {
                      level: 'error',
                      extra: {...error.request},
                    });
                  } else {
                    Alert.alert('Error', 'No response received from server');
                    Sentry.addBreadcrumb({
                      category: 'API Error',
                      type: 'Error',
                      message: 'Flight search Error on Request',
                      level: 'error',
                      data: {...error},
                    });
                    Sentry.captureException(
                      'No response received from server',
                      {
                        level: 'warning',
                        extra: {...error},
                      },
                    );
                  }
                } else {
                  // Something happened in setting up the request that triggered an Error
                  // console.debug(
                  //   'Something happened in setting up the request that triggered an Error',
                  //   error.message,
                  // );
                  Sentry.captureException(error.message, {
                    level: 'error',
                    data: {...error},
                  });
                }
                // console.debug(error.config);
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
