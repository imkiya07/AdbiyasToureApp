import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toggleTripType} from './flightType';
import {
  tDestination,
  tDestinationPayload,
  tFlightTypes,
  tTimePayload,
} from '@utils/types';

const defaultState: tDestination = {
  DepartureDateTime: '',
  OriginLocationCode: '',
  DestinationLocationCode: '',
  originLocation: {name: '', city: '', country: '', iata: ''},
  destinationLocation: {name: '', city: '', country: '', iata: ''},
};

const initialState: tDestination[] = [{...defaultState}];

const flightDestinations = createSlice({
  name: 'flightDestinations',
  initialState,
  reducers: {
    updateOriginLocationCode: (
      state,
      action: PayloadAction<tDestinationPayload>,
    ) => {
      state[action.payload.index].OriginLocationCode = action.payload.iata;
      state[action.payload.index].originLocation.name = action.payload.name;
      state[action.payload.index].originLocation.city = action.payload.city;
      state[action.payload.index].originLocation.country =
        action.payload.country;
      state[action.payload.index].originLocation.iata = action.payload.iata;
    },
    updateDestinationLocationCode: (
      state,
      action: PayloadAction<tDestinationPayload>,
    ) => {
      state[action.payload.index].DestinationLocationCode = action.payload.iata;
      state[action.payload.index].destinationLocation.name =
        action.payload.name;
      state[action.payload.index].destinationLocation.city =
        action.payload.city;
      state[action.payload.index].destinationLocation.country =
        action.payload.country;
      state[action.payload.index].destinationLocation.iata =
        action.payload.iata;
    },
    updateDepartureDateTime: (state, action: PayloadAction<tTimePayload>) => {
      state[action.payload.index].DepartureDateTime = action.payload.value;
    },
    addDestination: state => {
      state.push({...defaultState});
    },
    resetFlightState: state => {
      state.splice(0, state.length, ...initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      toggleTripType,
      (state, action: PayloadAction<tFlightTypes>) => {
        if (action.payload === 'Return') {
          state[1] = {
            OriginLocationCode: state[0].DestinationLocationCode,
            DestinationLocationCode: state[0].OriginLocationCode,
            DepartureDateTime: '',
            originLocation: {...state[0].destinationLocation},
            destinationLocation: {...state[0].originLocation},
          };
        } else if (action.payload === 'OpenJaw') {
          state[1] = {...defaultState};
        }
      },
    );
  },
});

export const {
  updateOriginLocationCode,
  updateDestinationLocationCode,
  updateDepartureDateTime,
  addDestination,
  resetFlightState,
} = flightDestinations.actions;

export default flightDestinations.reducer;
