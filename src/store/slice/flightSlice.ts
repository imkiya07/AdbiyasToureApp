import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
});

export const {setFlightDetails, setTotalDuration} = flightSlice.actions;

export default flightSlice.reducer;
