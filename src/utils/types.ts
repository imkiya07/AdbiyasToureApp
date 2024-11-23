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
