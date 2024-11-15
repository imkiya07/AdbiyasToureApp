import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {decrement, increment} from '@store/slice/counter';
import {fetchUser} from '@store/slice/fetchUser';
import {useAppDispatch, useAppSelector} from '@utils/hooks';

const TestRedux = () => {
  // const user = useSelector((state: any) => state.user.data);
  const counter = useAppSelector(state => state.counter.counter);
  const dispatch = useAppDispatch();
  return (
    <View>
      <>
        <Text>TestRedux</Text>
        <Text>{counter}</Text>

        <TouchableOpacity
          style={{
            paddingHorizontal: 5,
            paddingVertical: 15,
            marginVertical: 5,
            backgroundColor: '#d3d3d3',
          }}
          onPress={() => {
            dispatch(increment(5));
          }}>
          <Text style={{textAlign: 'center'}}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 5,
            paddingVertical: 15,
            marginVertical: 5,
            backgroundColor: '#f77425',
          }}
          onPress={() => {
            dispatch(decrement(8));
          }}>
          <Text style={{textAlign: 'center'}}>Decrement</Text>
        </TouchableOpacity>
      </>
      <TouchableOpacity
        style={{
          paddingHorizontal: 5,
          paddingVertical: 15,
          marginVertical: 5,
          backgroundColor: '#d3d3d3',
        }}
        onPress={() => {
          dispatch(fetchUser()).then(response => {
            console.log('User: ', response);
          });
        }}>
        <Text style={{textAlign: 'center'}}>Fetch Users</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestRedux;

const styles = StyleSheet.create({});
