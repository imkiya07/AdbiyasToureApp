import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type tCabins = 'Economy' | 'Premium Economy' | 'Business Class' | 'First Class';

interface PassengerState {
  adults: number;
  children: number;
  infants: number;
  cabinClass: tCabins;
}

const initialState: PassengerState = {
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: 'Economy',
};

const passengerSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    updateAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    updateChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    updateInfants(state, action: PayloadAction<number>) {
      state.infants = action.payload;
    },
    updateCabinClass(state, action: PayloadAction<tCabins>) {
      state.cabinClass = action.payload;
    },
  },
});

export const {updateAdults, updateChildren, updateInfants, updateCabinClass} =
  passengerSlice.actions;
export default passengerSlice.reducer;
