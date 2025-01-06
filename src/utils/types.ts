import {SharedValue} from 'react-native-reanimated';

export type tPassengerType = 'ADT' | 'CHD' | 'INF';

type tSegment = {
  legIndicator: string;
  operating_airline: string;
  marketing_airline: string;
  departure_airport: string;
  arrival_airport: string;
  DepartureAirportLocationCode: string;
  ArrivalAirportLocationCode: string;
  DepartureDateTime: string;
  ArrivalDateTime: string;
  stops: number;
  JourneyDuration: number;
  Equipment: string;
  OperatingCarrierCode: string;
  OperatingFlightNumber: string;
  MarketingCarriercode: string;
  MarketingFlightNumber: string;
  StopQuantityInfos: any[];
  SegmentRef: number;
  CabinClassCode: string;
  RBD: string;
  FareFamily: string;
  SeatsRemaining: number;
  CheckinBaggage: tBaggage[];
  CabinBaggage: tBaggage[];
  FareBasisCodes: string;
  ItineraryRef: number;
};

type tBaggage = {
  Type: string;
  Value: string;
};

type tFare = {
  FareType: string;
  Currency: string;
  FareRef: number;
  PaxType: string;
  Quantity: number;
  BaseFare: string;
  TotalFare: string;
};

type tPenaltiesData = {
  PaxType: string;
  RefundPenaltyAmount: string;
  RefundAllowed: boolean;
  Currency: string;
  ChangePenaltyAmount: string;
  ChangeAllowed: boolean;
};

export type tFlightResult = {
  flight_id: string;
  airline: string;
  airline_name: string;
  airline_img: string;
  segments: tSegment[];
  fares: tFare;
  penaltiesData: tPenaltiesData;
  fareSourceCode: string;
};

type tAirlineFilter = {
  value: string;
  label: string;
};

type tFilter = {
  airlines: tAirlineFilter[];
  flight_numbers: string[];
  stops: number[];
};

export type tFlightSearch = {
  success: boolean;
  message: string;
  deviceId: string;
  count: number;
  results: tFlightResult[];
  filter: tFilter;
};

export type tCabins = 'Y' | 'S' | 'C' | 'F'; // Y=Economy,C=Business,F=First & S=Premium Economy

export type tClassOptions = {
  value: tCabins;
  label: string;
};
export type tPassengerState = {
  adults: number;
  children: number;
  infants: number;
  cabinClass: tClassOptions;
};

export type tFlightTypes = 'OneWay' | 'Return' | 'OpenJaw' | 'Circle';

export type tFlightTypeState = {
  tripType: tFlightTypes;
};

export type tFlightSearchState = {
  searchResults: tFlightResult[];
  loading: boolean;
  error: string | null;
};

export type tDestination = {
  DestinationLocationCode: string;
  DepartureDateTime: string;
  OriginLocationCode: string;
  originLocation: tAirportField;
  destinationLocation: tAirportField;
};

type tAirportField = {
  iata: string;
  name: string;
  city: string;
  country: string;
};

export type tDestinationPayload = tAirportField & {
  index: number;
};

export type tTimePayload = {
  index: number;
  value: string;
};

export type tFlightForm = {
  title: string;
  selectedAirport: string;
  selectedAirportCb: ({name, iata, city, country}: tAirportField) => void;
};

export type tAirport = {
  city: string;
  country: string;
  iata: string;
  id: number;
  name: string;
};

export type tTravelerState = {
  PassengerType: tPassengerType;
  Gender: string;
  PassengerName: {
    PassengerTitle: string;
    PassengerFirstName: string;
    PassengerLastName: string;
  };
  DateOfBirth: string;
  Passport: {
    PassportNumber: string;
    ExpiryDate: string;
    Country: string;
  };
  PassengerNationality: string;
  NationalID: string;
};

export type tBookingState = {
  flight_id: string;
  CountryCode: string;
  AreaCode: string;
  PhoneNumber: string;
  Email: string;
  PostCode: string;
  airTravelers: tTravelerState[];
};

export type tAccordionItem = {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: any;
  duration?: number;
};

export type tCountry = {
  name: string;
  code: string;
};

export type tCountryModalProp = {
  visible: boolean;
  closeModal: () => void;
  onSelectCountry: (country: tCountry) => void;
};
