import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResultData = {
  name: string,
  scores: number,
  mins: number,
}

type TestResultsState = ResultData[];

const initialState: TestResultsState = [
  {
    name: 'rahul chawla',
    scores: 6,
    mins: 30,
  },
  {
    name: 'mehul mehra',
    scores: 20,
    mins: 36,
  },
  {
    name: 'aryan singh',
    scores: 10,
    mins: 44,
  },
  {
    name: 'rajat rajput',
    scores: 15,
    mins: 20,
  },
  {
    name: 'aniket bhalla',
    scores: 24,
    mins: 20,
  }
]

const TestResultsSlice = createSlice({
  name: 'testResults',
  initialState: initialState,
  reducers: {
    addNewTestResult: (state, action: PayloadAction<ResultData>) => {
      const currentUserName = action.payload.name;
      const newState = state.filter((result) => result.name !== currentUserName);
      return [...newState, action.payload]
    },
  }
});

const { actions, reducer } = TestResultsSlice;
export const { addNewTestResult } = actions;
export default reducer;