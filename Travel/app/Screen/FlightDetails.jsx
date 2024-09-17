import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FlightDetails = () => {
  const flight = {
    departureTime: '2024-08-01 12:30',
    passengerNumber: 2,
    totalAmount: 500,
    flightNumber: 'BG 101',
    airline: 'Biman Bangladesh Airlines',
    origin: 'Dhaka (DAC)',
    destination: 'Chittagong (CGP)',
    duration: '1h',
    stops: 0,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Flight Details</Text>
        <Text style={styles.label}>Flight Number: <Text style={styles.value}>{flight.flightNumber}</Text></Text>
        <Text style={styles.label}>Airline: <Text style={styles.value}>{flight.airline}</Text></Text>
        <Text style={styles.label}>Origin: <Text style={styles.value}>{flight.origin}</Text></Text>
        <Text style={styles.label}>Destination: <Text style={styles.value}>{flight.destination}</Text></Text>
        <Text style={styles.label}>Departure Time: <Text style={styles.value}>{flight.departureTime}</Text></Text>
        <Text style={styles.label}>Duration: <Text style={styles.value}>{flight.duration}</Text></Text>
        <Text style={styles.label}>Stops: <Text style={styles.value}>{flight.stops}</Text></Text>
        <Text style={styles.label}>Passenger Number: <Text style={styles.value}>{flight.passengerNumber}</Text></Text>
        <Text style={styles.label}>Total Amount: <Text style={styles.value}>${flight.totalAmount}</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
  },
});

export default FlightDetails;
