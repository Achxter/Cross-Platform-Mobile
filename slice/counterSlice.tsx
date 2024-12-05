import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  success: number;
  failed: number;
}

const initialState: CounterState = {
  success: 0,
  failed: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementSuccess: (state) => {
      state.success += 1;
    },
    incrementFailed: (state) => {
      state.failed += 1;
    },
  },
});

export const { incrementSuccess, incrementFailed } = counterSlice.actions;
export default counterSlice.reducer;