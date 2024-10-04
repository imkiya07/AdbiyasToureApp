import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {images} from '../../../constants/index'
const FlightShowPage = () => {
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [modalVisible, setModalVisible] = useState(false);
  const flightCards = Array.from({ length: 10 });
  const classOptions = ['Economy', 'Business Class', 'First Class'];
  
  const navigation = useNavigation(); // Hook for navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#0b2c5f', '#0b2c5f']} style={styles.background}>
        

        <View style={styles.flightRoute}>
          <Text style={styles.routeText}>YUL---</Text>
          <FontAwesome5 name="plane" size={24} color="#000" />
          <Text style={styles.routeText}>---NRT</Text>
        </View>
        <Image
          source={images.Earth}
          style={styles.earthImage}
        />

        <View style={styles.infoContainer}>
          <View style={styles.datePassenger}>
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome name="calendar" size={16} color="#007AFF" />
              <Text style={styles.infoButtonText}> Dec 16th 2024</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome name="user" size={16} color="#007AFF" />
              <Text style={styles.infoButtonText}> 1 passenger</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.classpic}>
          <TouchableOpacity style={styles.classPicker} onPress={() => setModalVisible(true)}>
            <LinearGradient colors={['#007AFF', '#1E90FF']} style={styles.classPickerGradient}>
              <Text style={styles.selectedClassText}>{selectedClass}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {flightCards.map((_, index) => (
          <View key={index} style={styles.flightCard}>
            <View style={styles.flightDetails}>
              <Text style={styles.timeText}>7:05 AM</Text>
              <FontAwesome5 name="plane" size={16} color="#007AFF" />
              <Text style={styles.timeText}>8:05 PM</Text>
            </View>
            <View style={styles.airlineContainer}>
              <Image
                source={images.Quater}
                style={styles.airlineLogo}
              />
              <Text style={styles.flightText}>Qatar Airways</Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('TravellerDetailsScreen')}  style={styles.bookNowButton}>
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
              <Text style={styles.priceText}>$1400</Text>
            </View>
            <View style={styles.flightFooter}>
              <Text style={styles.detailsText}>8 LEFT {selectedClass}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('FlightDetails')}>
                <Text style={styles.detailsButton}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </LinearGradient>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Class</Text>
            <FlatList
              data={classOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedClass(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  earthImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color:"#FFFF"
  },
  datePassenger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 30,
  },
  infoButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 7,
    marginHorizontal: 5,
  },
  infoButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  classpic: {
    width: '100%',
    marginBottom: 20,
  },
  classPicker: {
    width: '100%',
    marginTop: 10,
  },
  classPickerGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedClassText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flightCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  airlineLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  flightText: {
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookNowButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsText: {
    fontSize: 12,
    color: '#666',
  },
  detailsButton: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default FlightShowPage;
