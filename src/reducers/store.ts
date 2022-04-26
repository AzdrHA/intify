import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '@components/slice/UserSlice';
import {guildMemberSlice} from '@components/slice/GuildMemberSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    guildMemberSlice: guildMemberSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
