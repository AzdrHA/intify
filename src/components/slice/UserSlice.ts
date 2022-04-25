import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@app/type/User/User';

const initialState: Partial<User> = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<User>) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export default userSlice.reducer;

