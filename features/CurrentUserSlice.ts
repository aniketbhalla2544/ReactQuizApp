import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Time = Record<'hrs' | 'mins' | 'sec', number>;

type CurrentUser = {
  name: string,
  scores: number,
  time: Time
}

interface State {
  currentUser: CurrentUser
}

const initialState: State = {
  currentUser: {
    name: '',
    scores: 0,
    time: {
      hrs: 0,
      mins: 0,
      sec: 0
    }
  }
}

const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    value: initialState
  },
  reducers: {
    updateCurrentUserName: (state, action: PayloadAction<string>) => {
      state.value.currentUser.name = action.payload
    },

    updateCurrentUserScores: (state, action: PayloadAction<number>) => {
      state.value.currentUser.scores = action.payload
    },

    updateCurrentUserTime: (state, action: PayloadAction<Time>) => {
      state.value.currentUser.time = action.payload
    },

    resetCurrentUser: (state) => {
      state.value = initialState
    },
  }
});

const { actions, reducer } = CurrentUserSlice;
export const { updateCurrentUserName, updateCurrentUserScores, updateCurrentUserTime, resetCurrentUser } = actions;
export default reducer;