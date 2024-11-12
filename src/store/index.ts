import {configureStore} from '@reduxjs/toolkit';
import {counterReducer} from './reducer/counter';
import {isLoggedReducer} from './reducer/authStatus';
import {fetchUser} from './slice/authStatus';
import logger from 'redux-logger';

// export const rootStore = createStore(allReducers);
export const rootStore = configureStore({
  reducer: {counterReducer, isLoggedReducer, fetchUser},
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
