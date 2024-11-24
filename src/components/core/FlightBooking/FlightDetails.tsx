import {useAppSelector} from '@utils/hooks';
import {tFlightResult} from '@utils/types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FlightDetailsScreen = ({route}: {route: any}) => {
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );
  const tripStates = useAppSelector(state => state.flightDestinations);
  console.log('🚀 ~ FlightDetailsScreen ~ tripStates:', tripStates);
  const flight: tFlightResult = route.params;
  console.log('🚀 ~ FlightDetailsScreen ~ flight:', flight);

  const totalDuration = flight.segments.reduce((acc, segment) => {
    return acc + segment.JourneyDuration;
  }, 0);

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationString = `${hours}h ${minutes}m`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#009FFD', '#2A2A72']} style={styles.header}>
        <Text style={styles.headerText}>Flight Details</Text>
      </LinearGradient>

      {/* Flight Information Section */}
      <View style={styles.flightInfoContainer}>
        <View style={styles.row}>
          <Icon name="plane-departure" size={24} color="#009FFD" />
          <View style={styles.flightTextContainer}>
            <Text style={styles.flightText}>
              {tripStates[0].originLocation.city} (
              {tripStates[0].originLocation.iata})
            </Text>
            <Text style={styles.smallText}>
              {tripStates[0].originLocation.name}
            </Text>
          </View>
        </View>

        <Text style={styles.flightTime}>
          {new Date(flight.segments[0].DepartureDateTime).toLocaleTimeString(
            [],
            {hour: '2-digit', minute: '2-digit'},
          )}
        </Text>

        <View style={styles.row}>
          <Icon name="plane-arrival" size={24} color="#009FFD" />
          <View style={styles.flightTextContainer}>
            <Text style={styles.flightText}>
              {tripStates[tripStates.length - 1].destinationLocation.city} (
              {tripStates[tripStates.length - 1].destinationLocation.iata})
            </Text>
            <Text style={styles.smallText}>
              {tripStates[tripStates.length - 1].destinationLocation.name}
            </Text>
          </View>
        </View>

        <Text style={styles.flightTime}>
          {new Date(
            flight.segments[flight.segments.length - 1].DepartureDateTime,
          ).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
        </Text>

        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>
            Flight Duration: {durationString}
          </Text>
        </View>
      </View>

      {/* Passenger & Class Selection Section */}
      <View style={styles.passengerSection}>
        <Text style={styles.sectionTitle}>Passenger Details</Text>
        <Text style={styles.detailText}>
          Adult: {adults}, Child: {children}, Infant: {infants}
        </Text>

        <Text style={styles.sectionTitle}>Class</Text>
        <Text style={styles.detailText}>{cabinClass.label}</Text>
      </View>

      {/* Total Amount Section */}
      <View style={styles.totalAmountSection}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.amountText}>
          {flight.fares.Currency}
          {flight.fares.TotalFare}
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flightInfoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flightTextContainer: {
    marginLeft: 10,
  },
  flightText: {
    fontSize: 18,
    fontWeight: '600',
  },
  smallText: {
    color: 'gray',
    fontSize: 12,
  },
  flightTime: {
    fontSize: 16,
    color: '#009FFD',
    marginVertical: 5,
    textAlign: 'right',
  },
  durationContainer: {
    marginTop: 10,
  },
  durationText: {
    color: 'gray',
    textAlign: 'center',
  },
  passengerSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  totalAmountSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009FFD',
  },
  button: {
    backgroundColor: '#009FFD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlightDetailsScreen;
