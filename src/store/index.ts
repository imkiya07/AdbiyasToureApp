import {createStore} from 'redux';
import {allReducers} from './reducer/allReducers';

export const rootStore = createStore(allReducers);
/* export const store = configureStore({
  reducer: {},
}); */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
