import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tFlightResult, tFlightSearchState} from '@utils/types';

const initialState: tFlightSearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    searchFlightsStart: state => {
      state.loading = true;
      state.error = null;
    },
    searchFlightsSuccess: (state, action: PayloadAction<tFlightResult[]>) => {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchFlightsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSearchResults: state => {
      state.searchResults = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  searchFlightsStart,
  searchFlightsSuccess,
  searchFlightsFailure,
  resetSearchResults,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
