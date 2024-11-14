import {createSlice} from '@reduxjs/toolkit';

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

export default authStatusSlice.reducer;
export const {login, logout, processing} = authStatusSlice.actions;
