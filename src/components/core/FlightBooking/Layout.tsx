import React, {FC, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '@constants/index';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {toggleTripType} from '@store/slice/flightType';
import FlightForm from '@components/layout/FlightForm';
import {resetFlightState} from '@store/slice/flightDestinations';
import axios from 'axios';
import {
  searchFlightsFailure,
  searchFlightsStart,
  searchFlightsSuccess,
} from '@store/slice/flightResults';
import {tLayoutScreenProps} from '@utils/types';

const LayoutScreen: FC<tLayoutScreenProps> = ({navigation}) => {
  const formView = useRef<ScrollView>(null);
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );
  const tripStates = useAppSelector(state => state.flightDestinations);
  const AirTripType = useAppSelector(state => state.flightTypeSlice.tripType);
  const {loading} = useAppSelector(state => state.flightSearchSlice);
  const dispatch = useAppDispatch();

  const searchFlight = async () => {
    const PassengerTypeQuantities = getPassengerTypeQuantities();
    const flightDetails = getFlightDetails(PassengerTypeQuantities);

    if (!loading) {
      dispatch(searchFlightsStart());
      console.debug('🚀 ~ searchFlight ~ payload', flightDetails);
      try {
        const response = await axios.post(
          'https://flightkiya.cosmelic.com/api/b2c/search?filter=true',
          flightDetails,
        );
        // console.log('🚀 ~ searchFlight ~ response:', response);
        handleSearchResponse(response.data);
      } catch (error: any) {
        handleSearchError(error);
      }
    }
  };

  const getPassengerTypeQuantities = () => {
    const quantities = [
      {
        Code: 'ADT',
        Quantity: adults,
      },
    ];
    if (children > 0) {
      quantities.push({
        Code: 'CHD',
        Quantity: children,
      });
    }
    if (infants > 0) {
      quantities.push({
        Code: 'INF',
        Quantity: infants,
      });
    }
    return quantities;
  };

  const getFlightDetails = (PassengerTypeQuantities: any) => {
    const destinationArr = tripStates.map(destination => {
      return {
        DestinationLocationCode: destination.DestinationLocationCode,
        DepartureDateTime: destination.DepartureDateTime,
        OriginLocationCode: destination.OriginLocationCode,
      };
    });

    return {
      CabinPreference: cabinClass.value,
      OriginDestinationInformations: destinationArr,
      TravelPreferences: {
        AirTripType,
      },
      PricingSourceType: 'Public',
      PassengerTypeQuantities,
      RequestOptions: 'Fifty',
    };
  };

  const handleSearchResponse = (data: any) => {
    if (data.success) {
      if (data.results === 0) {
        Alert.alert('No flights found');
        return;
      } else {
        dispatch(searchFlightsSuccess(data.results));
        navigation.navigate('FlightShow');
      }
    } else {
      dispatch(searchFlightsFailure(data.error.message));
      Alert.alert(`We're Sorry`, data.error.message);
      console.warn('🚀 ~ searchFlight ~ error', data.error);
    }
  };

  const handleSearchError = (error: any) => {
    console.warn('🚀 ~ searchFlight ~ error', error.toString());
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        dispatch(searchFlightsFailure(error.response.data.message));
        Alert.alert('Error', error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        dispatch(searchFlightsFailure('No response received from server'));
        if (error.toString() === 'AxiosError: Network Error') {
          Alert.alert(
            'Error',
            'It Appear you have Internet issue! \nPlease Check your Internet and Try Again.\n Thank You!',
          );
        } else {
          Alert.alert('Error', 'No response received from server');
        }
      } else {
        // Something happened in setting up the request
        dispatch(searchFlightsFailure(error.message));
        Alert.alert('Error', error.message);
      }
    } else {
      // Handle other errors
      dispatch(searchFlightsFailure('An unexpected error occurred'));
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      formView?.current?.scrollToEnd({animated: true});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      formView?.current?.scrollTo({y: 0, animated: true});
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={images.Cover}
      className="flex-1 h-screen w-screen relative ">
      <LinearGradient
        colors={['#0b2c5f', '#ffffff']}
        className="w-screen h-screen bottom-0 left-0 absolute "
      />
      <ScrollView
        ref={formView}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <Image source={images.Plane} style={styles.planeImage} />
        <View style={styles.container}>
          <Text style={styles.title}>Book Your Flight</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                AirTripType === 'OneWay' && styles.selectedButton,
              ]}
              onPress={() => {
                dispatch(toggleTripType('OneWay'));
                dispatch(resetFlightState());
              }}>
              <Text style={styles.buttonText}>One Way</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                AirTripType === 'Return' && styles.selectedButton,
              ]}
              onPress={() => dispatch(toggleTripType('Return'))}>
              <Text style={styles.buttonText}>Round Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                AirTripType === 'OpenJaw' && styles.selectedButton,
              ]}
              onPress={() => dispatch(toggleTripType('OpenJaw'))}>
              <Text style={styles.buttonText}>Multi City</Text>
            </TouchableOpacity>
          </View>

          <FlightForm />

          <TouchableOpacity
            className="rounded-xl overflow-hidden mt-3"
            onPress={() => searchFlight()}>
            <LinearGradient
              colors={['#009FFD', '#2A2A72']}
              className="android:p-4 ios:p-0">
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  className="ios:p-4 android:p-0"
                />
              ) : (
                <Text className="text-white font-bold text-lg ios:p-4 android:p-0 text-center ">
                  SEARCH FLIGHTS
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  planeImage: {
    width: 400,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default LayoutScreen;
