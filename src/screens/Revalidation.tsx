import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {tRevalidationProps} from '@utils/types';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {setFlightDetails, setTotalDuration} from '@store/slice/flightSlice';
import {generatePassengerForm} from '@store/slice/bookingSlice';
import {BASE_URL} from '@env';

const Revalidation: FC<tRevalidationProps> = ({route, navigation}) => {
  const {adults, children, infants} = useAppSelector(
    state => state.passengerSlice,
  );
  const {flightId, redirectScreen} = route.params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (flightId) {
      console.debug('Revalidation API:', BASE_URL + `/revalidated/` + flightId);
      axios
        .get(BASE_URL + `/revalidated/` + flightId)
        .then(response => {
          dispatch(setFlightDetails(response.data.data));
          let durationCount = 0;
          response.data.data.flights[0].flightSegments.forEach(
            (segment: any) => {
              durationCount += segment.JourneyDuration;
            },
          );
          dispatch(setTotalDuration(durationCount));
        })
        .then(() => {
          dispatch(generatePassengerForm({adults, children, infants}));
        })
        .then(() => {
          setTimeout(() => {
            navigation.navigate(redirectScreen);
          }, 500);
        })
        .catch(error => {
          console.error('🚀 ~ FlightDetailsScreen ~ error', error.toString());
          navigation.popTo('FlightShow');
        });
    } else {
      navigation.popTo('LayoutScreen');
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center flex-col gap-1 ">
      <Text className="font-bold text-6xl ">Hi!</Text>
      <Text className="font-semibold text-xl ">
        We're fetching the latest info of your flight!
      </Text>
      <Text className="font-normal text-lg mb-5 ">Please Be Patient!</Text>
      <ActivityIndicator size="large" color="#000000" />
      <Text className="font-normal text-sm mt-5 ">
        Depending on various factor... {'\n'} It can take up to 2 minutes!
      </Text>
    </View>
  );
};

export default Revalidation;
