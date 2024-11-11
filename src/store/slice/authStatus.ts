import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const authStatusSlice = createSlice({
  name: 'authStatus',
  initialState: false,
  reducers: {
    login: state => true,
    logout: state => false,
    processing: state => false,
  },
});

const initialUserState = {
  loading: false,
  data: [],
  error: '',
};

const fetchUser = createAsyncThunk('authStatus/fetchUser', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  const data = await response.data;

  data.map((user: any) => {
    user.id;
  });
});

export const {login, logout} = authStatusSlice.actions;
