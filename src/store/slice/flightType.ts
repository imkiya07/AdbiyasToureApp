import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tFlightTypes, tFlightTypeState} from '@utils/types';

const initialState: tFlightTypeState = {
  tripType: 'OneWay',
};

const flightTypeSlice = createSlice({
  name: 'flightType',
  initialState,
  reducers: {
    toggleTripType: (state, action: PayloadAction<tFlightTypes>) => {
      state.tripType = action.payload;
    },
    resetTripState: () => {
      console.debug('Resetting trip state');

      return initialState;
    },
  },
});

export const {toggleTripType, resetTripState} = flightTypeSlice.actions;

export default flightTypeSlice.reducer;
