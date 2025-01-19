import {ActivityIndicator, Alert, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {tRevalidationProps} from '@utils/types';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {setFlightDetails, setTotalDuration} from '@store/slice/flightSlice';
import {generatePassengerForm} from '@store/slice/bookingSlice';
import {BASE_URL} from '@env';
import * as Sentry from '@sentry/react-native';

const apiUrl = BASE_URL + '/revalidated/';

const Revalidation: FC<tRevalidationProps> = ({route, navigation}) => {
  const {adults, children, infants} = useAppSelector(
    state => state.passengerSlice,
  );
  const {flightId, redirectScreen} = route.params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (flightId) {
      const apiUrlWithId = apiUrl + flightId;
      console.debug('Revalidation API:', apiUrlWithId);
      Sentry.addBreadcrumb({
        category: 'API Logging',
        type: 'info',
        message: 'Revalidating flight',
        level: 'info',
        data: {
          apiEndPoint: apiUrlWithId,
        },
      });
      axios
        .get(apiUrlWithId)
        .then(response => {
          dispatch(setFlightDetails(response.data.data));
          let durationCount = 0;
          response.data.data.flights[0].flightSegments.forEach(
            (segment: any) => {
              durationCount += segment.JourneyDuration;
            },
          );
          dispatch(setTotalDuration(durationCount));
          Sentry.addBreadcrumb({
            category: 'API Logging',
            type: 'info',
            message: 'Revalidation successful',
            level: 'debug',
            data: {...response.data.data},
          });
        })
        .then(() => {
          dispatch(generatePassengerForm({adults, children, infants}));
          Sentry.addBreadcrumb({
            category: 'API Logging',
            type: 'info',
            message: 'Generated passenger form',
            level: 'info',
          });
        })
        .then(() => {
          setTimeout(() => {
            navigation.navigate(redirectScreen);
          }, 500);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.debug(error.response.data);
            console.debug(error.response.status);
            console.debug(error.response.headers);
            Sentry.addBreadcrumb({
              category: 'API Error',
              type: 'Error',
              message: 'Flight Booking Error with Response',
              level: 'error',
              data: {...error.response},
            });
            Sentry.captureException(error.response.data.message, {
              level: 'fatal',
              extra: {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
              },
            });
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.debug(error.request);
            if (error.message === 'Network Error') {
              Sentry.addBreadcrumb({
                category: 'API Error',
                type: 'Warn',
                message: 'Flight booking Network Error',
                level: 'warning',
                data: {...error},
              });
              Sentry.captureException(error.message, {
                level: 'error',
                extra: {...error.request},
              });
              Alert.alert(
                'Error',
                'It Appear you have Internet issue! \nPlease Check your Internet and Try Again.\n Thank You!',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.popTo('FlightShow');
                    },
                  },
                ],
              );
            } else {
              Sentry.addBreadcrumb({
                category: 'API Error',
                type: 'Error',
                message: 'Flight booking Error on Request',
                level: 'warning',
                data: {...error},
              });
              Sentry.captureException('No response received from server', {
                level: 'warning',
                extra: {...error},
              });
              Alert.alert('Error', 'No response received from server', [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.popTo('FlightShow');
                  },
                },
              ]);
            }
          } else {
            // Something happened in setting up the request that triggered an Error
            Sentry.addBreadcrumb({
              category: 'API Error',
              type: 'Error',
              message: 'Flight booking Error with setting up the request',
              level: 'error',
              data: {...error},
            });
            Sentry.captureException(error.message, {
              level: 'error',
              data: {...error},
            });
            console.debug(
              'Something happened in setting up the request that triggered an Error',
              error.message,
            );
            Alert.alert(
              'Oops!',
              'Something happened in setting up the request that triggered an Error',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.popTo('FlightShow');
                  },
                },
              ],
            );
          }
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
