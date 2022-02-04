import {configureStore} from '@reduxjs/toolkit';
import UserAction from '@app/actions/UserAction';

export const store = configureStore({
  reducer: {
    user: UserAction,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
