import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '@components/slice/UserSlice';
import {guildMember} from '@components/slice/GuildMemberSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    guildMember: guildMember.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
