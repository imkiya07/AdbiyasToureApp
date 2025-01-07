import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@utils/hooks';
import {tFlightResult} from '@utils/types';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';

const FlightDetailsScreen = ({route}: {route: any}) => {
  const navigation = useNavigation(); // Hook for navigation
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );
  const flight: tFlightResult = route.params;
  console.log('🚀 ~ FlightDetailsScreen ~ flight:', flight);
  const [flightDetails, setFlightDetails] = useState<any>();
  const [totalDuration, setTotalDuration] = useState(0);

  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(
        `https://flightkiya.cosmelic.com/api/b2c/revalidated/${flight.flight_id}`,
      );
      setFlightDetails(response.data.data);
      let durationCount = 0;
      response.data.data.flights[0].flightSegments.forEach((segment: any) => {
        durationCount += segment.JourneyDuration;
      });
      setTotalDuration(durationCount);
    } catch (error) {
      console.error('🚀 ~ FlightDetailsScreen ~ error', error);
    }
  };

  useEffect(() => {
    fetchFlightDetails();
    const intervalFetch = setInterval(() => {
      fetchFlightDetails();
    }, 30000);
    return () => {
      clearInterval(intervalFetch);
    };
  }, []);

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
        {flightDetails?.flights[0]?.flightSegments.map(
          (segment: any, index: number) => (
            <View key={segment.ArrivalDateTime} style={styles.row}>
              <View style={styles.flightTextContainer}>
                <Text style={styles.flightText}>
                  {segment.departureAirport}
                </Text>
                <Text style={styles.smallText}>
                  {dayjs(segment.DepartureDateTime).format('hh:mm A')}
                </Text>
              </View>
              <View style={styles.flightTextContainer}>
                <Text style={{...styles.flightText, ...styles.rtlText}}>
                  {segment.arrivalAirport}
                </Text>
                <Text style={{...styles.smallText, ...styles.rtlText}}>
                  {dayjs(segment.ArrivalDateTime).format('hh:mm A')}
                </Text>
              </View>
            </View>
          ),
        )}

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
          {flightDetails?.TotalFare?.CurrencyCode}&nbsp;
          {flightDetails?.TotalFare?.Amount}
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TravellerDetailsScreen')}>
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  flightTextContainer: {
    marginLeft: 10,
  },
  flightText: {
    fontSize: 16,
    fontWeight: '600',
  },
  smallText: {
    color: 'gray',
    fontSize: 12,
  },
  rtlText: {
    textAlign: 'right',
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
