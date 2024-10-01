import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date picker
import { images } from '@constants/index';
import { useNavigation } from "@react-navigation/native";
const LayoutScreen = () => {
  const navigation = useNavigation();
  const [tripType, setTripType] = useState<'OneWay' | 'RoundTrip' | 'MultiCity'>('OneWay');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business Class' | 'First Class'>('Economy');

  const handleDepartureDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  return (
    <ImageBackground
      source={images.Cover}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['#e6f1fa', '#ffffff']}
        style={styles.gradientContainer}
      >
        <Image source={images.Plane} style={styles.planeImage} />
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Book Your Flight</Text>

          {/* Trip Type Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, tripType === 'OneWay' && styles.selectedButton]}
              onPress={() => setTripType('OneWay')}
            >
              <Text style={styles.buttonText}>One Way</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, tripType === 'RoundTrip' && styles.selectedButton]}
              onPress={() => setTripType('RoundTrip')}
            >
              <Text style={styles.buttonText}>Round Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, tripType === 'MultiCity' && styles.selectedButton]}
              onPress={() => setTripType('MultiCity')}
            >
              <Text style={styles.buttonText}>Multi City</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Location Field */}
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#666"
            />
            {/* Destination Field */}
            <TextInput
              style={styles.input}
              placeholder="Destination"
              placeholderTextColor="#666"
            />
            {/* Departure Field */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Departure"
                placeholderTextColor="#666"
                editable={false}
                value={departureDate ? departureDate.toDateString() : ''}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={departureDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDepartureDateChange}
              />
            )}
            {/* Passenger Field */}
            <TouchableOpacity onPress={() => setShowPassengerModal(true)}>
              <TextInput
                style={styles.input}
                placeholder="Passenger"
                placeholderTextColor="#666"
                editable={false}
                value={`${adults} Adult, ${children} Children, ${infants} Infants, ${cabinClass}`}
              />
            </TouchableOpacity>
          </View>

          {/* Passenger Modal */}
          <Modal
            visible={showPassengerModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowPassengerModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Passengers</Text>

                {/* Adult Field */}
                <View style={styles.passengerRow}>
                  <Text>Adults</Text>
                  <View style={styles.passengerCounter}>
                    <TouchableOpacity onPress={() => setAdults(Math.max(1, adults - 1))}>
                      <Text style={styles.counterButton}>-</Text>
                    </TouchableOpacity>
                    <Text>{adults}</Text>
                    <TouchableOpacity onPress={() => setAdults(adults + 1)}>
                      <Text style={styles.counterButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children Field */}
                <View style={styles.passengerRow}>
                  <Text>Children</Text>
                  <View style={styles.passengerCounter}>
                    <TouchableOpacity onPress={() => setChildren(Math.max(0, children - 1))}>
                      <Text style={styles.counterButton}>-</Text>
                    </TouchableOpacity>
                    <Text>{children}</Text>
                    <TouchableOpacity onPress={() => setChildren(children + 1)}>
                      <Text style={styles.counterButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Infants Field */}
                <View style={styles.passengerRow}>
                  <Text>Infants</Text>
                  <View style={styles.passengerCounter}>
                    <TouchableOpacity onPress={() => setInfants(Math.max(0, infants - 1))}>
                      <Text style={styles.counterButton}>-</Text>
                    </TouchableOpacity>
                    <Text>{infants}</Text>
                    <TouchableOpacity onPress={() => setInfants(infants + 1)}>
                      <Text style={styles.counterButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Cabin Class Selector */}
                <View style={styles.cabinClassRow}>
                  <Text style={styles.cabinclasstext}>Cabin Class</Text>
                  <View style={styles.cabinClassOptions}>
                    {['Economy', 'Premium Economy', 'Business Class', 'First Class'].map((className) => (
                      <TouchableOpacity
                        key={className}
                        style={[
                          styles.cabinClassOption,
                          cabinClass === className && styles.selectedCabinClass,
                        ]}
                        onPress={() => setCabinClass(className as any)}
                      >
                        <Text>{className}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setShowPassengerModal(false)}
                >
                  <Text style={styles.closeModalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Search Flights Button */}
          <TouchableOpacity  style={styles.searchButton}  onPress={() => navigation.navigate('FlightShow')}>
            <Text style={styles.searchButtonText}>SEARCH FLIGHTS</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  planeImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 470,
    height: 250,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#7ABEEB',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  passengerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: 'blue',
  },
  cabinclasstext: {
    fontSize: 24,
     fontWeight: 'bold',
},
  cabinClassRow: {
    marginTop:10,
    marginVertical: 10,
  },
  cabinClassOptions: {
    marginTop:20,
    flexDirection: 'column',
    gap:10,
    justifyContent: 'space-between',
  },
  cabinClassOption: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedCabinClass: {
    backgroundColor: '#7ABEEB',
  },
  closeModalButton: {
    padding: 15,
    backgroundColor: '#7ABEEB',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#7ABEEB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LayoutScreen;
