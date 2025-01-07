import TravelerAccordion from '@components/common/Accordions';
import ContactForm from '@components/common/ContactForm';
import {useNavigation} from '@react-navigation/native';
import {resetBookingForm} from '@store/slice/bookingSlice';
import {resetFlightState} from '@store/slice/flightDestinations';
import {resetSearchResults} from '@store/slice/flightResults';
import {resetTripState} from '@store/slice/flightType';
import {resetPassengerState} from '@store/slice/passengerSlice';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';

const TravellerDetailsScreen: FC = () => {
  const formBody = useAppSelector(state => state.bookingSlice);
  const {airTravelers, CountryCode, PhoneNumber, Email, PostCode} = formBody;
  const [validForm, setValidForm] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetBookingForm());
    });

    return () => {
      setValidForm(false);
      unsubscribe();
    };
  }, [airTravelers, CountryCode, PhoneNumber, Email, PostCode]);

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
              console.debug('🚀 ~ searchFlight ~ payload', formBody);
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
                  `Something went wrong while processing your booking request. \n Please Try Again Later! \n\n Thank you!`,
                );
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

export default TravellerDetailsScreen;
