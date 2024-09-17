// App.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VisaPage = () => {
  return (
    <LinearGradient colors={['#3b82f6', '#e0e7ff']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Visa</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destination Country</Text>
          <TextInput style={styles.input} placeholder="Thailand" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Entry</Text>
          <TextInput style={styles.input} placeholder="May 20" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Exit (Optional)</Text>
          <TextInput style={styles.input} placeholder="Jun 24" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Travellers</Text>
          <TextInput style={styles.input} placeholder="1 Traveller(s)" />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>Track Visa Application Status</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Our Top Destinations</Text>
        <View style={styles.destinations}>
          <View style={styles.destinationItem}>
            <Text style={styles.destinationText}>Tourist visa only</Text>
            <View style={styles.destinationImage} />
          </View>
          <View style={styles.destinationItem}>
            <Text style={styles.destinationText}>Tourist visa only</Text>
            <View style={styles.destinationImage} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1D4ED8',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  statusButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 10,
  },
  statusButtonText: {
    color: '#1D4ED8',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 20,
  },
  destinations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destinationItem: {
    alignItems: 'center',
  },
  destinationText: {
    color: 'white',
    marginBottom: 10,
  },
  destinationImage: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default VisaPage;
