import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {images} from '../../../constants/index';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {updateCabinClass} from '@store/slice/passengerSlice';
import {tClassOptions, tFlightShowProps} from '@utils/types';
export const classOptions: tClassOptions[] = [
  {
    label: 'Economy',
    value: 'Y',
  },
  {
    label: 'Business',
    value: 'C',
  },
  {
    label: 'First Class',
    value: 'F',
  },
  {
    label: 'Premium Economy',
    value: 'S',
  },
];
const FlightShowPage: FC<tFlightShowProps> = ({navigation}) => {
  const {
    cabinClass: selectedClass,
    adults,
    children,
    infants,
  } = useAppSelector(state => state.passengerSlice);
  const tripStates = useAppSelector(state => state.flightDestinations);
  const flightSearchResults = useAppSelector(
    state => state.flightSearchSlice.searchResults,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch(); // Hook for dispatching actions
  const passengerCount = infants + children + adults;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#0b2c5f', '#0b2c5f']}
        className="android:p-4 ios:p-0 items-center flex-1 flex flex-col ">
        <View style={styles.flightRoute}>
          <Text style={styles.routeText}>
            {tripStates[0].OriginLocationCode}---
          </Text>
          <FontAwesome6Icon name="plane-departure" size={24} color="#ffffff" />
          <Text style={styles.routeText}>
            ---{tripStates[tripStates.length - 1].DestinationLocationCode}
          </Text>
        </View>
        <Image source={images.Earth} style={styles.earthImage} />

        <View style={styles.infoContainer}>
          <View style={styles.datePassenger}>
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome6Icon name="calendar" size={16} color="#007AFF" />
              <Text style={styles.infoButtonText}>
                {tripStates[0].DepartureDateTime}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome6Icon name="user" size={16} color="#007AFF" />
              <Text style={styles.infoButtonText}>
                {passengerCount} passenger
                {passengerCount > 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.classpic}>
          <TouchableOpacity
            className="w-full mt-3 rounded-lg overflow-hidden"
            onPress={() => setModalVisible(true)}>
            <LinearGradient
              colors={['#007AFF', '#1E90FF']}
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
              className="">
              <Text className="py-3 px-4 font-bold color-white text-center ">
                {selectedClass.label}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {flightSearchResults?.map((flight, index) => (
          <View key={index + flight.flight_id} style={styles.flightCard}>
            <View className="flex-row justify-between flex items-center mb-2 ">
              <Text style={styles.timeText}>
                {new Date(
                  flight.segments[0].ArrivalDateTime,
                ).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
              </Text>
              <FontAwesome6Icon
                name="plane-departure"
                size={16}
                color="#007AFF"
              />
              <Text style={styles.timeText}>
                {new Date(
                  flight.segments[0].DepartureDateTime,
                ).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
              </Text>
            </View>
            <View style={styles.airlineContainer}>
              <Image
                source={{uri: flight.airline_img}}
                style={styles.airlineLogo}
              />
              <Text style={styles.flightText}>{flight.airline_name}</Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Revalidation', {
                    flightId: flight.flight_id,
                    redirectScreen: 'TravelerDetailsScreen',
                  });
                }}
                style={styles.bookNowButton}>
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
              <Text style={styles.priceText}>
                {flight.fares.Currency + '' + flight.fares.TotalFare}
              </Text>
            </View>
            <View style={styles.flightFooter}>
              <Text style={styles.detailsText}>
                {flight.segments[0].SeatsRemaining
                  ? flight.segments[0].SeatsRemaining +
                    ' LEFT ' +
                    selectedClass.label
                  : ''}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Revalidation', {
                    flightId: flight.flight_id,
                    redirectScreen: 'FlightDetails',
                  })
                }>
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
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Class</Text>
            <FlatList
              data={classOptions}
              keyExtractor={item => item.value}
              renderItem={({item}: {item: tClassOptions}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    dispatch(updateCabinClass(item));
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
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
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#FFFF',
  },
  datePassenger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  infoButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 7,
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
  flightCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
