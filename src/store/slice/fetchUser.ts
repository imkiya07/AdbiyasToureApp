import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserState = {
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
  initialState: initialUserState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.error = 'Error';
      state.data = [];
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export {fetchUser};
