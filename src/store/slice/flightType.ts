import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type tFlightTypes = 'OneWay' | 'Return' | 'OpenJaw' | 'Circle';

type tFlightTypeState = {
  tripType: tFlightTypes;
};

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
