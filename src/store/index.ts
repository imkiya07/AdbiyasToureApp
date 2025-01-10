import {configureStore} from '@reduxjs/toolkit';
import flightTypeSlice from './slice/flightType';
import passengerSlice from './slice/passengerSlice';
import flightDestinations from './slice/flightDestinations';
import flightSearchSlice from './slice/flightResults';
import sessionSlice from './slice/sessionSlice';
import bookingSlice from './slice/bookingSlice';

const rootStore = configureStore({
  reducer: {
    flightTypeSlice,
    passengerSlice,
    flightDestinations,
    flightSearchSlice,
    sessionSlice,
    bookingSlice,
  },
  // middleware: getDefaultMiddleware => {
  //   return getDefaultMiddleware().concat(logger);
  // },
});

export default rootStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
