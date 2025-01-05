import Accordion from '@components/common/Accordions';
import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

const TravellerDetailsScreen: FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Accordion />

      {/* Confirm Button */}
      <View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TravellerDetailsScreen;
