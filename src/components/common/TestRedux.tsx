import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '@store/actions';

const TestRedux = () => {
  const counter = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>TestRedux</Text>
      <Text>{counter}</Text>

      <TouchableOpacity
        onPressIn={() => {
          dispatch(increment(5));
        }}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 15,
          marginVertical: 5,
          backgroundColor: '#d3d3d3',
        }}
        onPress={() => {}}>
        <Text style={{textAlign: 'center'}}>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => {
          dispatch(decrement(8));
        }}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 15,
          marginVertical: 5,
          backgroundColor: '#f77425',
        }}
        onPress={() => {}}>
        <Text style={{textAlign: 'center'}}>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestRedux;

const styles = StyleSheet.create({});
