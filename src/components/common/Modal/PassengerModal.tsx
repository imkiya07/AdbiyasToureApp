import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import PassengerCounter from '@components/core/FlightBooking/PassengerCounter';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {
  updateAdults,
  updateCabinClass,
  updateChildren,
  updateInfants,
} from '@store/slice/passengerSlice';
import {classOptions} from '@components/core/FlightBooking/ShowCard';
import {tClassOptions} from '@utils/types';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';

const PassengerModal: FC = () => {
  const {cabinClass, infants, children, adults} = useAppSelector(
    state => state.passengerSlice,
  );
  // Active States
  const [showPassengerModal, setShowPassengerModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(updateAdults(1));
        dispatch(updateChildren(0));
        dispatch(updateInfants(0));
        dispatch(updateCabinClass(classOptions[0]));
        return false; // Return false to allow the default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [dispatch]),
  );

  return (
    <>
      <TouchableOpacity onPress={() => setShowPassengerModal(true)}>
        <TextInput
          style={styles.input}
          placeholder="Passenger"
          placeholderTextColor="#666"
          onPress={() => setShowPassengerModal(true)}
          editable={false}
          value={`${adults} Adult, ${children} Children, ${infants} Infants, ${cabinClass.label}`}
        />
      </TouchableOpacity>
      <Modal
        visible={showPassengerModal}
        transparent={true}
        animationType="slide">
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
              onDecrease={() =>
                dispatch(updateInfants(Math.max(0, infants - 1)))
              }
            />
            {/* Cabin Class Section */}
            <View style={styles.cabinContainer}>
              <Text style={styles.cabinTitle}>Select Class</Text>
              <TouchableOpacity
                style={styles.cabinButton}
                onPress={() => {
                  const index = classOptions.findIndex(
                    (item: tClassOptions) => item.value === cabinClass.value,
                  );
                  const newIndex = (index + 1) % classOptions.length;
                  dispatch(updateCabinClass(classOptions[newIndex]));
                }}>
                <Text style={styles.cabinButtonText}>{cabinClass.label}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setShowPassengerModal(false)}>
              <Text style={styles.confirmButtonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PassengerModal;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
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

  cabinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  cabinTitle: {
    fontSize: 16,
  },

  cabinButton: {
    width: 150,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },

  cabinButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
