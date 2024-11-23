import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import PassengerModal from '@components/common/Modal/PassengerModal';
import AirportField from '@components/common/AirportField';
import {
  addDestination,
  updateDepartureDateTime,
  updateDestinationLocationCode,
  updateOriginLocationCode,
} from '@store/slice/flightDestinations';
import FlightDatePicker from '@components/common/FlightDatePicker';

const FlightForm: FC = () => {
  const dispatch = useAppDispatch();
  const tripType = useAppSelector(state => state.flightTypeSlice.tripType);
  const {OriginLocationCode, DestinationLocationCode, DepartureDateTime} =
    useAppSelector(state => state.flightDestinations[0]);
  const returnDate =
    useAppSelector(state => state.flightDestinations[1]?.DepartureDateTime) ??
    '';

  const tripStates = useAppSelector(state => state.flightDestinations);
  return (
    <>
      <View style={styles.form}>
        <AirportField
          title="Form"
          selectedAirport={OriginLocationCode}
          selectedAirportCb={e => {
            dispatch(updateOriginLocationCode({index: 0, value: e}));
            if (tripType === 'Return') {
              dispatch(
                updateDestinationLocationCode({
                  index: 1,
                  value: e,
                }),
              );
            }
          }}
        />
        <AirportField
          title="To"
          selectedAirport={DestinationLocationCode}
          selectedAirportCb={e => {
            dispatch(updateDestinationLocationCode({index: 0, value: e}));
            if (tripType === 'Return') {
              dispatch(
                updateOriginLocationCode({
                  index: 1,
                  value: e,
                }),
              );
            }
          }}
        />

        {tripType === 'Return' && (
          <FlightDatePicker
            placeholder="Return Date"
            initialValue={returnDate}
            minimumValue={
              DepartureDateTime ? new Date(DepartureDateTime) : new Date()
            }
            updateStateCb={date => {
              dispatch(
                updateDepartureDateTime({
                  index: 1,
                  value: date.toDateString(),
                }),
              );
            }}
          />
        )}
        <FlightDatePicker
          placeholder="Departure"
          initialValue={DepartureDateTime}
          updateStateCb={date => {
            dispatch(
              updateDepartureDateTime({
                index: 0,
                value: date.toDateString(),
              }),
            );
          }}
        />
        {/* Passenger Modal */}
        <PassengerModal />
      </View>

      {tripType === 'OpenJaw' &&
        tripStates.map((data, index) => {
          if (index > 0) {
            return (
              <View key={index + 12} style={styles.multiCityInput}>
                <AirportField
                  title={`From City ${index}`}
                  selectedAirport={data.OriginLocationCode}
                  selectedAirportCb={iata => {
                    dispatch(updateOriginLocationCode({index, value: iata}));
                  }}
                />
                <AirportField
                  title={`To City ${index}`}
                  selectedAirport={data.DestinationLocationCode}
                  selectedAirportCb={iata => {
                    dispatch(
                      updateDestinationLocationCode({index, value: iata}),
                    );
                  }}
                />
                <FlightDatePicker
                  placeholder="Date"
                  initialValue={data.DepartureDateTime}
                  updateStateCb={date => {
                    dispatch(
                      updateDepartureDateTime({
                        index,
                        value: date.toDateString(),
                      }),
                    );
                  }}
                />
              </View>
            );
          }
        })}
      {tripType === 'OpenJaw' && tripStates.length < 3 && (
        <TouchableOpacity
          onPress={() => {
            if (tripStates.length < 3) {
              dispatch(addDestination());
            }
          }}>
          <Text style={styles.addCityText}>+ Add City</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default FlightForm;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  multiCityInput: {
    marginBottom: 10,
  },
  addCityText: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
