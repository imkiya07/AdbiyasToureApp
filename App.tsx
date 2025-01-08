import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LayoutScreen from '@components/core/FlightBooking/Layout';
import FlightShow from '@components/core/FlightBooking/ShowCard';
import FlightDetails from '@components/core/FlightBooking/FlightDetails';
import TravellerDetailsScreen from '@components/core/FlightBooking/TravellerDetails';
import LayoutHotel from '@components/core/HotelBooking/HotelBookLayout';
import LayoutTour from '@components/core/TourBooking/TourBookLayout.';
import LayoutVisa from '@components/core/VisaBooking/VisaLayout';
import TabNavigator from '@components/navigators/TabNavigator';
import {Provider} from 'react-redux';
import rootStore from '@store/index';
import {TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {resetFlightState} from '@store/slice/flightDestinations';
import {PaperProvider} from 'react-native-paper';
import {resetBookingForm} from '@store/slice/bookingSlice';

const Stack = createNativeStackNavigator();

// Main App component with Stack and Tab navigation
const App: FC = () => {
  /* useEffect(() => {
    axios
      .get('https://flightkiya.cosmelic.com/api/common/session-id')
      .then(res => {
        console.debug('Session ID:', res.data.data.session_id);
        axios.defaults.headers.common['sessionId'] = res.data.data.session_id;
      });
  }, []); */
  const dispatch = rootStore.dispatch;
  // const tripStates = rootStore.getState().flightDestinations;
  // const flightTypeStates = rootStore.getState().flightTypeSlice;
  // const passengerStates = rootStore.getState().passengerSlice;

  return (
    <Provider store={rootStore}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Main Tab Navigation */}
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{headerShown: false}}
            />

            {/* Flight Book Layout, not part of tabs */}
            <Stack.Screen
              name="LayoutScreen"
              component={LayoutScreen}
              options={{
                title: 'Flight Booking',
                headerShown: true, // Set to false if you want to hide the header
              }}
            />

            <Stack.Screen
              name="FlightDetails"
              component={FlightDetails}
              options={{
                title: 'Flight Details',
                headerShown: true, // Set to false if you want to hide the header
              }}
            />
            <Stack.Screen
              name="FlightShow"
              component={FlightShow}
              options={({navigation}) => ({
                title: ' Select Your Flight',
                headerShown: true, // Set to false if you want to hide the header
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(resetFlightState());
                      navigation.goBack();
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="#000000" />
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              name="TravellerDetailsScreen"
              component={TravellerDetailsScreen}
              options={({navigation}) => ({
                title: ' Traveller Details',
                headerShown: true, // Set to false if you want to hide the header
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(resetBookingForm());
                      navigation.goBack();
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="#000000" />
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              name="LayoutHotel"
              component={LayoutHotel}
              options={{
                title: 'Hello Hotel',
                headerShown: true, // Set to false if you want to hide the header
              }}
            />

            <Stack.Screen
              name="LayoutTour"
              component={LayoutTour}
              options={{
                title: 'Hello Tour',
                headerShown: true, // Set to false if you want to hide the header
              }}
            />

            <Stack.Screen
              name="LayoutVisa"
              component={LayoutVisa}
              options={{
                title: ' Hello Visa',
                headerShown: true, // Set to false if you want to hide the header
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
