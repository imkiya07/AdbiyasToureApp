import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tFlightResult} from '@utils/types';

interface FlightSearchState {
  searchResults: tFlightResult[];
  loading: boolean;
  error: string | null;
}

const initialState: FlightSearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    searchFlightsStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchFlightsSuccess(state, action: PayloadAction<tFlightResult[]>) {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchFlightsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {searchFlightsStart, searchFlightsSuccess, searchFlightsFailure} =
  flightSearchSlice.actions;

export default flightSearchSlice.reducer;
