import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: (state, action) => state + action.payload,
  },
});

export const {increment, decrement} = counterSlice.actions;
