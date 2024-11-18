import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '@constants/index';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {toggleTripType} from '@store/slice/flightType';
import FlightForm from '@components/layout/FlightForm';

const LayoutScreen = () => {
  const navigation = useNavigation();

  const tripType = useAppSelector(state => state.flightTypeSlice.tripType);
  const dispatch = useAppDispatch();

  return (
    <ImageBackground source={images.Cover} style={styles.backgroundImage}>
      <LinearGradient
        colors={['#0b2c5f', '#ffffff']}
        style={styles.gradientContainer}>
        <ScrollView>
          <Image source={images.Plane} style={styles.planeImage} />
          <View style={styles.container}>
            <Text style={styles.title}>Book Your Flight</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  tripType === 'OneWay' && styles.selectedButton,
                ]}
                onPress={() => dispatch(toggleTripType('OneWay'))}>
                <Text style={styles.buttonText}>One Way</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  tripType === 'RoundTrip' && styles.selectedButton,
                ]}
                onPress={() => dispatch(toggleTripType('RoundTrip'))}>
                <Text style={styles.buttonText}>Round Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  tripType === 'MultiCity' && styles.selectedButton,
                ]}
                onPress={() => dispatch(toggleTripType('MultiCity'))}>
                <Text style={styles.buttonText}>Multi City</Text>
              </TouchableOpacity>
            </View>

            <FlightForm />

            <LinearGradient
              style={styles.searchButton}
              colors={['#009FFD', '#2A2A72']}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FlightShow')}>
                <Text style={styles.searchButtonText}>SEARCH FLIGHTS</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
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
});

export default LayoutScreen;
