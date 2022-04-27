import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '@app/slice/UserSlice';
import {guildMemberSlice} from '@app/slice/GuildMemberSlice';
import {friendsSlice} from '@app/slice/FriendsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    guildMemberSlice: guildMemberSlice.reducer,
    friends: friendsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
