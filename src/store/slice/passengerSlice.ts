import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tCabins, tPassengerState} from '@utils/types';

const initialState: tPassengerState = {
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: 'Y',
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
