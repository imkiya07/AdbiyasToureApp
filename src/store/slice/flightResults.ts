import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tFlightResult, tFlightSearchState} from '@utils/types';
import {resetAllState} from './flightType';

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
      console.debug('Resetting search results');
      state.searchResults = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetAllState, state => {
      return initialState;
    });
  },
});

export const {
  searchFlightsStart,
  searchFlightsSuccess,
  searchFlightsFailure,
  resetSearchResults,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
