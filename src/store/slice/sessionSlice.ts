import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
});

export const {setSessionId, clearSessionId} = sessionSlice.actions;

export default sessionSlice.reducer;
