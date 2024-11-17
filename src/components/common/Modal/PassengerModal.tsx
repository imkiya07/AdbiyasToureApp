import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import PassengerCounter from '@components/core/FlightBooking/PassengerCounter';

type tPassengerModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PassengerModal: FC<tPassengerModalProps> = ({visible, onClose}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<
    'Economy' | 'Premium Economy' | 'Business Class' | 'First Class'
  >('Economy');

  const handlePassengerChange = (
    type: string,
    action: 'increase' | 'decrease',
  ) => {
    if (type === 'adult') {
      setAdults(prev => Math.max(1, prev + (action === 'increase' ? 1 : -1)));
    } else if (type === 'child') {
      setChildren(prev => Math.max(0, prev + (action === 'increase' ? 1 : -1)));
    } else if (type === 'infant') {
      setInfants(prev => Math.max(0, prev + (action === 'increase' ? 1 : -1)));
    }
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
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

          {/* Cabin Class Section */}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => onClose()}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PassengerModal;

const styles = StyleSheet.create({
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
});
