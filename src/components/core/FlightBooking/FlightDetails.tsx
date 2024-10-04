import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FlightDetailsScreen: FC = () => {
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
            <Text style={styles.flightText}>Dhaka (DAC)</Text>
            <Text style={styles.smallText}>Hazrat Shahjalal Int'l</Text>
          </View>
        </View>

        <Text style={styles.flightTime}>08:45 AM</Text>

        <View style={styles.row}>
          <Icon name="plane-arrival" size={24} color="#009FFD" />
          <View style={styles.flightTextContainer}>
            <Text style={styles.flightText}>New York (JFK)</Text>
            <Text style={styles.smallText}>John F. Kennedy Int'l</Text>
          </View>
        </View>

        <Text style={styles.flightTime}>06:30 PM</Text>

        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>Flight Duration: 15h 45m</Text>
        </View>
      </View>

      {/* Passenger & Class Selection Section */}
      <View style={styles.passengerSection}>
        <Text style={styles.sectionTitle}>Passenger Details</Text>
        <Text style={styles.detailText}>Adult: 1, Child: 0, Infant: 0</Text>

        <Text style={styles.sectionTitle}>Class</Text>
        <Text style={styles.detailText}>Business Class</Text>
      </View>

      {/* Total Amount Section */}
      <View style={styles.totalAmountSection}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.amountText}>$1,200.00</Text>
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
    shadowOffset: { width: 0, height: 4 },
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
    shadowOffset: { width: 0, height: 4 },
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
    shadowOffset: { width: 0, height: 4 },
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
