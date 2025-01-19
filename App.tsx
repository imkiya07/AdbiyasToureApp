import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LayoutScreen from '@components/core/FlightBooking/Layout';
import FlightShow from '@components/core/FlightBooking/ShowCard';
import FlightDetails from '@components/core/FlightBooking/FlightDetails';
import TravelerDetailsScreen from '@components/core/FlightBooking/TravelerDetails';
import LayoutHotel from '@components/core/HotelBooking/HotelBookLayout';
import LayoutTour from '@components/core/TourBooking/TourBookLayout.';
import LayoutVisa from '@components/core/VisaBooking/VisaLayout';
import TabNavigator from '@components/navigators/TabNavigator';
import {Provider} from 'react-redux';
import rootStore from '@store/index';
import {TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {PaperProvider} from 'react-native-paper';
import {tRootStackParamList} from '@utils/types';
import './src/styles/global.css';
import Revalidation from '@screens/Revalidation';
import * as Sentry from '@sentry/react-native';
import {SENTRY_DNS} from '@env';
import {resetAllState} from '@store/slice/flightType';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: SENTRY_DNS,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
  integrations: [navigationIntegration],
});

const Stack = createNativeStackNavigator<tRootStackParamList>();

// Main App component with Stack and Tab navigation
const App: FC = () => {
  const containerRef = React.useRef(null);
  const dispatch = rootStore.dispatch;

  return (
    <Provider store={rootStore}>
      <PaperProvider>
        <NavigationContainer
          ref={containerRef}
          onReady={() => {
            navigationIntegration.registerNavigationContainer(containerRef);
          }}>
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
              options={({navigation}) => ({
                title: ' Flight Details',
                headerShown: true, // Set to false if you want to hide the header
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(resetAllState());
                      navigation.popTo('FlightShow');
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="#000000" />
                  </TouchableOpacity>
                ),
              })}
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
                      dispatch(resetAllState());
                      navigation.goBack();
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="#000000" />
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              name="TravelerDetailsScreen"
              component={TravelerDetailsScreen}
              options={({navigation}) => ({
                title: ' Travelers Details',
                headerShown: true, // Set to false if you want to hide the header
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(resetAllState());
                      navigation.popTo('FlightShow');
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="#000000" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Revalidation"
              component={Revalidation}
              options={{
                headerShown: false, // Set to false if you want to hide the header
              }}
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

export default Sentry.wrap(App);
