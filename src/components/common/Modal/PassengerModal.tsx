import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import PassengerCounter from '@components/core/FlightBooking/PassengerCounter';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {
  updateAdults,
  updateChildren,
  updateInfants,
} from '@store/slice/passenger';

type tPassengerModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PassengerModal: FC<tPassengerModalProps> = ({visible, onClose}) => {
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );

  const dispatch = useAppDispatch();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Passengers</Text>

          {/* Adult Section */}
          <PassengerCounter
            title="Adults"
            count={adults}
            onIncrease={() => dispatch(updateAdults(adults + 1))}
            onDecrease={() => dispatch(updateAdults(Math.max(1, adults - 1)))}
          />

          {/* Child Section */}
          <PassengerCounter
            title="Children"
            count={children}
            onIncrease={() => dispatch(updateChildren(children + 1))}
            onDecrease={() =>
              dispatch(updateChildren(Math.max(0, children - 1)))
            }
          />

          {/* Infant Section */}
          <PassengerCounter
            title="Infants"
            count={infants}
            onIncrease={() => dispatch(updateInfants(infants + 1))}
            onDecrease={() => dispatch(updateInfants(Math.max(0, infants - 1)))}
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
