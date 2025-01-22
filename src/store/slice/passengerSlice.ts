import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tClassOptions, tPassengerState} from '@utils/types';
import {resetAllState} from './flightType';

const initialState: tPassengerState = {
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: {
    value: 'Y',
    label: 'Economy',
  },
};

const passengerSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    updateAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    updateChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload;
    },
    updateInfants: (state, action: PayloadAction<number>) => {
      state.infants = action.payload;
    },
    updateCabinClass: (state, action: PayloadAction<tClassOptions>) => {
      state.cabinClass = action.payload;
    },
    resetPassengerState: () => {
      console.debug('Resetting passenger state');
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetAllState, state => {
      console.debug('Resetting passenger state');
      return initialState;
    });
  },
});

export const {
  updateAdults,
  updateChildren,
  updateInfants,
  updateCabinClass,
  resetPassengerState,
} = passengerSlice.actions;
export default passengerSlice.reducer;
