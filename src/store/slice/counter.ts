import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {counter: 0},
  reducers: {
    increment: (state, action) => {
      console.log('Increment Triggered: ', action);

      state.counter += action.payload;
    },
    decrement: (state, action) => {
      console.log('Decrement Triggered: ', action);
      state.counter -= action.payload;
    },
  },
});

export default counterSlice.reducer;
export const {increment, decrement} = counterSlice.actions;
