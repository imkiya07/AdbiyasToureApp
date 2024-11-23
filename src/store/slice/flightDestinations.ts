import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toggleTripType} from './flightType';
import {tDestination, tDestinationPayload, tFlightTypes} from '@utils/types';

const initialState: tDestination[] = [
  {
    DepartureDateTime: '',
    OriginLocationCode: '',
    DestinationLocationCode: '',
  },
];

const flightDestinations = createSlice({
  name: 'flightDestinations',
  initialState,
  reducers: {
    updateOriginLocationCode: (
      state,
      action: PayloadAction<tDestinationPayload>,
    ) => {
      state[action.payload.index].OriginLocationCode = action.payload.value;
    },
    updateDestinationLocationCode: (
      state,
      action: PayloadAction<tDestinationPayload>,
    ) => {
      state[action.payload.index].DestinationLocationCode =
        action.payload.value;
    },
    updateDepartureDateTime: (
      state,
      action: PayloadAction<tDestinationPayload>,
    ) => {
      state[action.payload.index].DepartureDateTime = action.payload.value;
    },
    addDestination: state => {
      state.push({
        OriginLocationCode: '',
        DestinationLocationCode: '',
        DepartureDateTime: '',
      });
    },
    resetStateObj: state => {
      state.splice(0, state.length - 1);
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
          };
        } else if (action.payload === 'OpenJaw') {
          state[1] = {
            OriginLocationCode: '',
            DestinationLocationCode: '',
            DepartureDateTime: '',
          };
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
  resetStateObj,
} = flightDestinations.actions;

export default flightDestinations.reducer;
