import TravelerAccordion from '@components/common/Accordions';
import ContactForm from '@components/common/ContactForm';
import {useFocusEffect} from '@react-navigation/native';
import {resetBookingForm} from '@store/slice/bookingSlice';
import {resetFlightState} from '@store/slice/flightDestinations';
import {resetSearchResults} from '@store/slice/flightResults';
import {resetTripState} from '@store/slice/flightType';
import {resetPassengerState} from '@store/slice/passengerSlice';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {tMainTabsProps} from '@utils/types';
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

const TravelerDetailsScreen: FC<tMainTabsProps> = ({navigation}) => {
  const formBody = useAppSelector(state => state.bookingSlice);
  const {airTravelers, CountryCode, PhoneNumber, Email, PostCode} = formBody;
  const dispatch = useAppDispatch();
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    const validContactDetails =
      CountryCode.length > 0 &&
      PhoneNumber.length > 0 &&
      Email.length > 0 &&
      PostCode.length > 0;

    const validTravelers =
      airTravelers.length > 0 &&
      airTravelers.every(traveler => {
        const {PassengerName, DateOfBirth, Passport, PassengerNationality} =
          traveler;
        return (
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
  }, [airTravelers, CountryCode, PhoneNumber, Email, PostCode]);

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
              console.debug(
                '🚀 ~ searchFlight ~ payload',
                formBody,
                formBody.airTravelers[0].PassengerName,
                formBody.airTravelers[0].Passport,
              );
              try {
                const response = await axios.post(
                  'https://flightkiya.cosmelic.com/api/b2c/booking',
                  formBody,
                );
                // console.log('🚀 ~ searchFlight ~ response:', response);
                Alert.alert(
                  'Thank You!',
                  `Your Booking Request was successfully received. \n\n Thank you!`,
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('MainTabs');
                        // Redirect to Home Page
                        dispatch(resetBookingForm());
                        dispatch(resetFlightState());
                        dispatch(resetSearchResults());
                        dispatch(resetTripState());
                        dispatch(resetPassengerState());
                      },
                    },
                  ],
                );
              } catch (error: any) {
                Alert.alert(
                  'Sorry!',
                  `Something went wrong while processing your booking request. \nPlease Try Again Later! \n\nThank you!`,
                );
                console.warn('🚀 ~ searchFlight ~ error', error);
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
