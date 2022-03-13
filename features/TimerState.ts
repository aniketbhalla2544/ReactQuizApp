import { createSlice } from "@reduxjs/toolkit";

interface State {
  shouldTimerBeStopped: boolean,
  shouldTimerBeReset: boolean
}

const initialState: State = {
  shouldTimerBeStopped: false,
  shouldTimerBeReset: false,
}

const TimerStateSlice = createSlice({
  name: 'timerState',
  initialState: initialState,
  reducers: {
    setShouldTimerBeStoppedToTrue: (state) => {
      state.shouldTimerBeStopped = true;
    },

    setShouldTimerBeStoppedToFalse: (state) => {
      state.shouldTimerBeStopped = false;
    },

    setShouldTimerBeResetToTrue: (state) => {
      state.shouldTimerBeReset = true;
    },

    setShouldTimerBeResetToFalse: (state) => {
      state.shouldTimerBeReset = false;
    }
  }
});

const { actions, reducer } = TimerStateSlice;
export const { setShouldTimerBeResetToTrue, setShouldTimerBeResetToFalse, setShouldTimerBeStoppedToTrue, setShouldTimerBeStoppedToFalse } = actions;
export default reducer;