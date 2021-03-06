import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GuildMember} from '@app/type/Guild/GuildMember';

const initialState: GuildMember[] | undefined = [];

export const guildMemberSlice = createSlice({
  name: 'guildMemberSlice',
  initialState,
  reducers: {
    setDefault: (state, action: PayloadAction<GuildMember[] | undefined>) => {
      state = Object.assign(state, action.payload ? [...action.payload] : undefined);
    },
    addGuild: (state, action: PayloadAction<GuildMember[] | undefined>) => {
      state = Object.assign(state, action.payload ? [...action.payload] : undefined);
    },
  },
});

export default guildMemberSlice.reducer;

