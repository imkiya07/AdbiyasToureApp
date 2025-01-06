import TravelerAccordion from '@components/common/Accordions';
import ContactForm from '@components/common/ContactForm';
import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

const TravellerDetailsScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <ContactForm />
        <Text style={styles.sectionTitle}>Passenger Information</Text>
        <TravelerAccordion />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {}}
          style={[
            styles.button,
            {
              // backgroundColor: '#009FFD',
              backgroundColor: '#C4C4C4',
            },
          ]}>
          <Text style={styles.buttonText}>Proceed to Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TravellerDetailsScreen;
