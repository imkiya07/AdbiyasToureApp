import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/* type tPassengerTypeQuantities = {
  Code: 'ADT' | 'CHD' | 'INF';
  Quantity: number;
}; */
// type tFlightTypes = 'OneWay' | 'Return' | 'OpenJaw' | 'Circle';
// type tCabins = 'Y' | 'S' | 'C' | 'F';
type tDestination = {
  DestinationLocationCode: string;
  DepartureDateTime: string;
  OriginLocationCode: string;
};

/* type tSearchFlight = {
"CabinPreference": tCabins;
  OriginDestinationInformations: tDestination[];
  TravelPreferences: {
    AirTripType: tFlightTypes;
  }; 
    PricingSourceType: 'Public' | 'Private' | 'All';
  PassengerTypeQuantities: tPassengerTypeQuantities[];
  RequestOptions: 'Fifty' | 'Hundred' | 'TwoHundred'; 
};*/

const initialState: tDestination[] = [
  {
    DepartureDateTime: '',
    OriginLocationCode: '',
    DestinationLocationCode: '',
  },
];
/* TravelPreferences: {
    AirTripType: 'OneWay',
  },
  PricingSourceType: 'Public',
  PassengerTypeQuantities: [
    {
      Code: 'ADT',
      Quantity: 1,
    },
  ],
  RequestOptions: 'Fifty', */

const flightDestinations = createSlice({
  name: 'flightDestinations',
  initialState,
  reducers: {
    updateOriginLocationCode: (state, action: PayloadAction<string>) => {
      state[0].OriginLocationCode = action.payload;
    },
    updateDestinationLocationCode: (state, action: PayloadAction<string>) => {
      state[0].DestinationLocationCode = action.payload;
    },
    updateDepartureDateTime: (state, action: PayloadAction<string>) => {
      state[0].DepartureDateTime = action.payload;
    },
    addMultiCity: state => {
      state.push({
        OriginLocationCode: '',
        DestinationLocationCode: '',
        DepartureDateTime: '',
      });
    },
  },
});

export const {
  updateOriginLocationCode,
  updateDestinationLocationCode,
  updateDepartureDateTime,
  addMultiCity,
} = flightDestinations.actions;

export default flightDestinations.reducer;
