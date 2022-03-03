import { configureStore } from '@reduxjs/toolkit';
import CurrentUserReducer from "./features/CurrentUserSlice";
import TestResultsReducer from './features/TestResultsSlice';

const store = configureStore({
  reducer: {
    currentUserState: CurrentUserReducer,
    testResultsState: TestResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;