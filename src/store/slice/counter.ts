import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CounterState = {
  counter: number;
};
const initialState: CounterState = {counter: 0};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      console.log('Increment Triggered: ', action);

      state.counter += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      console.log('Decrement Triggered: ', action);
      state.counter -= action.payload;
    },
  },
});

export default counterSlice.reducer;
export const {increment, decrement} = counterSlice.actions;
