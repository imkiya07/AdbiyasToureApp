import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resetAllState} from './flightType';

interface FlightState {
  flightDetails: any;
  totalDuration: number;
}

const initialState: FlightState = {
  flightDetails: null,
  totalDuration: 0,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightDetails(state, action: PayloadAction<any>) {
      state.flightDetails = action.payload;
    },
    setTotalDuration(state, action: PayloadAction<number>) {
      state.totalDuration = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetAllState, state => {
      return initialState;
    });
  },
});

export const {setFlightDetails, setTotalDuration} = flightSlice.actions;

export default flightSlice.reducer;
