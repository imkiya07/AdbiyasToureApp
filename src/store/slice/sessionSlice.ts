import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resetAllState} from './flightType';

interface SessionState {
  sessionId: string;
}

const initialState: SessionState = {
  sessionId: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
    clearSessionId(state) {
      state.sessionId = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(resetAllState, state => {
      return initialState;
    });
  },
});

export const {setSessionId, clearSessionId} = sessionSlice.actions;

export default sessionSlice.reducer;
