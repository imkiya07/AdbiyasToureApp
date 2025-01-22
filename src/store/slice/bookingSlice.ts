import {GenderList} from '@constants/radioList';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tBookingState, tTravelerState} from '@utils/types';
import {resetAllState} from './flightType';

const initialState: tBookingState = {
  CountryCode: '',
  PhoneNumber: '',
  Email: '',
  PostCode: '',
  AirTravelers: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.CountryCode = action.payload;
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
    generatePassengerForm: (
      state,
      action: PayloadAction<{
        adults: number;
        children: number;
        infants: number;
      }>,
    ) => {
      const {adults, children, infants} = action.payload;
      state.AirTravelers = [
        ...Array(adults).fill({
          PassengerType: 'ADT',
          Gender: GenderList[0].value,
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
          Gender: GenderList[0].value,
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
          Gender: GenderList[0].value,
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
    setGender: (
      state,
      action: PayloadAction<{index: number; value: string}>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].Gender = value;
    },
    setPassengerTitle: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].PassengerName.PassengerTitle = value;
    },
    setPassengerFirstName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].PassengerName.PassengerFirstName = value;
    },
    setPassengerLastName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].PassengerName.PassengerLastName = value;
    },
    setDateOfBirth: (
      state,
      action: PayloadAction<{index: number; value: string}>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].DateOfBirth = value;
    },
    setPassportNumber: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].Passport.PassportNumber = value;
    },
    setPassportExpiryDate: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].Passport.ExpiryDate = value;
    },
    setPassportCountry: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].Passport.Country = value;
    },
    setPassengerNationality: (
      state,
      action: PayloadAction<{index: number; value: string}>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].PassengerNationality = value;
    },
    setNationalID: (
      state,
      action: PayloadAction<{index: number; value: string}>,
    ) => {
      const {index, value} = action.payload;
      state.AirTravelers[index].NationalID = value;
    },
    resetBookingForm: () => {
      console.log('Resetting booking form');
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetAllState, state => {
      console.log('Resetting booking form');
      return initialState;
    });
  },
});

export const {
  setCountryCode,
  setPhoneNumber,
  setEmail,
  setPostCode,
  generatePassengerForm,
  setGender,
  setPassengerTitle,
  setPassengerFirstName,
  setPassengerLastName,
  setDateOfBirth,
  setPassportNumber,
  setPassportExpiryDate,
  setPassportCountry,
  setPassengerNationality,
  setNationalID,
  resetBookingForm,
} = bookingSlice.actions;

export default bookingSlice.reducer;
