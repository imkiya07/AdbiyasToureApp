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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { images } from '@constants/index';
import { useNavigation } from '@react-navigation/native';

const LayoutScreen = () => {
  const navigation = useNavigation();
  const [tripType, setTripType] = useState<'OneWay' | 'RoundTrip' | 'MultiCity'>('OneWay');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business Class' | 'First Class'>('Economy');

  const [multiCityList, setMultiCityList] = useState([{ from: '', to: '', date: null }]);

  const handleDepartureDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleReturnDateChange = (event: any, selectedDate?: Date) => {
    setShowReturnDatePicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const handleAddCity = () => {
    if (multiCityList.length < 3) {
      setMultiCityList([...multiCityList, { from: '', to: '', date: null }]);
    }
  };

  const handleMultiCityInputChange = (index: number, field: string, value: any) => {
    const updatedCities = [...multiCityList];
    updatedCities[index][field] = value;
    setMultiCityList(updatedCities);
  };

  const handlePassengerChange = (type: string, action: 'increase' | 'decrease') => {
    if (type === 'adult') {
      setAdults((prev) => Math.max(1, prev + (action === 'increase' ? 1 : -1)));
    } else if (type === 'child') {
      setChildren((prev) => Math.max(0, prev + (action === 'increase' ? 1 : -1)));
    } else if (type === 'infant') {
      setInfants((prev) => Math.max(0, prev + (action === 'increase' ? 1 : -1)));
    }
  };

  return (
    <ImageBackground source={images.Cover} style={styles.backgroundImage}>
      <LinearGradient colors={['#0b2c5f', '#ffffff']} style={styles.gradientContainer}>
        <ScrollView>
          <Image source={images.Plane} style={styles.planeImage} />
          <View style={styles.container}>
            <Text style={styles.title}>Book Your Flight</Text>

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
            <View style={styles.form}>
              <TextInput style={styles.input} placeholder="From" placeholderTextColor="#666" />
              <TextInput style={styles.input} placeholder="To" placeholderTextColor="#666" />

              {tripType === 'RoundTrip' && (
                <>
                  <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
                    <TextInput
                      style={styles.input}
                      placeholder="Return Date"
                      placeholderTextColor="#666"
                      editable={false}
                      value={returnDate ? returnDate.toDateString() : ''}
                    />
                  </TouchableOpacity>
                  {showReturnDatePicker && (
                    <DateTimePicker
                      value={returnDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={handleReturnDateChange}
                    />
                  )}
                </>
              )}

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

            {tripType === 'MultiCity' &&
              multiCityList.map((city, index) => (
                <View key={index} style={styles.multiCityInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={`From City ${index + 1}`}
                    placeholderTextColor="#666"
                    value={city.from}
                    onChangeText={(value) => handleMultiCityInputChange(index, 'from', value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={`To City ${index + 1}`}
                    placeholderTextColor="#666"
                    value={city.to}
                    onChangeText={(value) => handleMultiCityInputChange(index, 'to', value)}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                      style={styles.input}
                      placeholder="Date"
                      placeholderTextColor="#666"
                      editable={false}
                      value={city.date ? city.date.toDateString() : ''}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            {tripType === 'MultiCity' && multiCityList.length < 3 && (
              <TouchableOpacity onPress={handleAddCity}>
                <Text style={styles.addCityText}>+ Add City</Text>
              </TouchableOpacity>
            )}

            <LinearGradient style={styles.searchButton} colors={['#009FFD', '#2A2A72']}>
              <TouchableOpacity onPress={() => navigation.navigate('FlightShow')}>
                <Text style={styles.searchButtonText}>SEARCH FLIGHTS</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Passenger Modal */}
        <Modal visible={showPassengerModal} transparent={true} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Passengers</Text>

              {/* Adult Section */}
              <PassengerCounter
                title="Adults"
                count={adults}
                onIncrease={() => handlePassengerChange('adult', 'increase')}
                onDecrease={() => handlePassengerChange('adult', 'decrease')}
              />

              {/* Child Section */}
              <PassengerCounter
                title="Children"
                count={children}
                onIncrease={() => handlePassengerChange('child', 'increase')}
                onDecrease={() => handlePassengerChange('child', 'decrease')}
              />

              {/* Infant Section */}
              <PassengerCounter
                title="Infants"
                count={infants}
                onIncrease={() => handlePassengerChange('infant', 'increase')}
                onDecrease={() => handlePassengerChange('infant', 'decrease')}
              />

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowPassengerModal(false)}
              >
                <Text style={styles.confirmButtonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </ImageBackground>
  );
};

// Reusable component for passenger counter
const PassengerCounter = ({ title, count, onIncrease, onDecrease }: any) => (
  <View style={styles.counterContainer}>
    <Text style={styles.counterTitle}>{title}</Text>
    <View style={styles.counterButtonGroup}>
      <TouchableOpacity onPress={onDecrease} style={styles.counterButton}>
        <Text style={styles.counterButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.counterValue}>{count}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.counterButton}>
        <Text style={styles.counterButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
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
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
  },
  multiCityInput: {
    marginBottom: 10,
  },
  addCityText: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterTitle: {
    fontSize: 16,
  },
  counterButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 20,
  },
  counterValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default LayoutScreen;
