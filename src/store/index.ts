import {configureStore} from '@reduxjs/toolkit';
import flightTypeSlice from './slice/flightType';
import passengerSlice from './slice/passenger';
import flightDestinations from './slice/flightDestinations';
import flightSearchSlice from './slice/flightResults';
// import logger from 'redux-logger';

// export const rootStore = createStore(allReducers);
const rootStore = configureStore({
  reducer: {
    flightTypeSlice,
    passengerSlice,
    flightDestinations,
    flightSearchSlice,
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
