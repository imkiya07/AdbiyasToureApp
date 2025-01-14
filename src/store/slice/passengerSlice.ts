import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tClassOptions, tPassengerState} from '@utils/types';

const initialState: tPassengerState = {
  adults: 3,
  children: 1,
  infants: 1,
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
});

export const {
  updateAdults,
  updateChildren,
  updateInfants,
  updateCabinClass,
  resetPassengerState,
} = passengerSlice.actions;
export default passengerSlice.reducer;
