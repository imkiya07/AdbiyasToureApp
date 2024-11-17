import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';

type tCounterModalProps = {
  title: string;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const PassengerCounter: FC<tCounterModalProps> = ({
  title,
  count,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterTitle}>{title}</Text>
      <View style={styles.counterButtonGroup}>
        <TouchableOpacity onPress={onDecrease} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{count}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PassengerCounter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterTitle: {
    fontSize: 16,
  },
  counterButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 20,
  },
  counterValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
