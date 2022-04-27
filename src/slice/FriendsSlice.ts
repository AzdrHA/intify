import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Friend} from '@app/type/User/Friend';

const initialState: Friend[] = [];

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setDefault: (state, action: PayloadAction<Friend[]>) => {
      state = Object.assign(state, [...action.payload]);
    },
  },
});
