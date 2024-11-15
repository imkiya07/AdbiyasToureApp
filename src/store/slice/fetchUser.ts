import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
type User = {
  id: number;
  name: string;
};
type UserState = {
  loading: boolean;
  data: User[];
  error: string;
};
const initialState: UserState = {
  loading: false,
  data: [],
  error: '',
};

// Generates Pending, Fulfilled and rejected actions
const fetchUser = createAsyncThunk('authStatus/fetchUser', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  const data = await response.data;

  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.data = [];
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export {fetchUser};
