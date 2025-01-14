import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {tModalProp} from '@utils/types';

const ErrorModal: FC<tModalProp> = ({visible, closeModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <Text style={styles.title}>Sorry!</Text>
      <View style={styles.line} />
      <Text style={styles.title}>
        It Seems there is a trouble while completing your request.
      </Text>
      <Text style={styles.title}>Please Try Again later.</Text>
      <Text style={styles.title}>
        If the issue persist, please reach out to the support team with
        screenshot of this screen!
      </Text>
      <Text style={styles.title}>Error Code:</Text>
      <TouchableOpacity onPress={closeModal}>
        <Text>Okay</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
    width: '100%',
  },
  pickerBtn: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  countryName: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
