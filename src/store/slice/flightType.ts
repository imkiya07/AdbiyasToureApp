import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tFlightTypes, tFlightTypeState} from '@utils/types';

const initialState: tFlightTypeState = {
  tripType: 'OneWay',
};

const flightTypeSlice = createSlice({
  name: 'flightType',
  initialState,
  reducers: {
    toggleTripType(state, action: PayloadAction<tFlightTypes>) {
      state.tripType = action.payload;
    },
  },
});

export const {toggleTripType} = flightTypeSlice.actions;

export default flightTypeSlice.reducer;
