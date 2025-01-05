import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tBookingState, tTravelerState} from '@utils/types';

const initialState: tBookingState = {
  flight_id: '',
  CountryCode: '',
  AreaCode: '',
  PhoneNumber: '',
  Email: '',
  PostCode: '',
  airTravelers: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setFlightId: (state, action: PayloadAction<string>) => {
      state.flight_id = action.payload;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.CountryCode = action.payload;
    },
    setAreaCode: (state, action: PayloadAction<string>) => {
      state.AreaCode = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.PhoneNumber = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.Email = action.payload;
    },
    setPostCode: (state, action: PayloadAction<string>) => {
      state.PostCode = action.payload;
    },
    setPassengers: (
      state,
      action: PayloadAction<{
        adults: number;
        children: number;
        infants: number;
      }>,
    ) => {
      const {adults, children, infants} = action.payload;
      state.airTravelers = [
        ...Array(adults).fill({
          PassengerType: 'ADT',
          Gender: '',
          PassengerName: {
            PassengerTitle: '',
            PassengerFirstName: '',
            PassengerLastName: '',
          },
          DateOfBirth: '',
          Passport: {
            PassportNumber: '',
            ExpiryDate: '',
            Country: '',
          },
          PassengerNationality: '',
          NationalID: '',
        } as tTravelerState),
        ...Array(children).fill({
          PassengerType: 'CHD',
          Gender: '',
          PassengerName: {
            PassengerTitle: '',
            PassengerFirstName: '',
            PassengerLastName: '',
          },
          DateOfBirth: '',
          Passport: {
            PassportNumber: '',
            ExpiryDate: '',
            Country: '',
          },
          PassengerNationality: '',
          NationalID: '',
        } as tTravelerState),
        ...Array(infants).fill({
          PassengerType: 'INF',
          Gender: '',
          PassengerName: {
            PassengerTitle: '',
            PassengerFirstName: '',
            PassengerLastName: '',
          },
          DateOfBirth: '',
          Passport: {
            PassportNumber: '',
            ExpiryDate: '',
            Country: '',
          },
          PassengerNationality: '',
          NationalID: '',
        } as tTravelerState),
      ];
    },
  },
});

export const {
  setFlightId,
  setCountryCode,
  setAreaCode,
  setPhoneNumber,
  setEmail,
  setPostCode,
  setPassengers,
} = bookingSlice.actions;

export default bookingSlice.reducer;
