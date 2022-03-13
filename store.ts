import { configureStore } from '@reduxjs/toolkit';
import CurrentUserReducer from "./features/CurrentUserSlice";
import TestResultsReducer from './features/TestResultsSlice';
import TimerStateReducer from './features/TimerState';


const store = configureStore({
  reducer: {
    currentUserState: CurrentUserReducer,
    testResultsState: TestResultsReducer,
    timerState: TimerStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;