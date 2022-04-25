import {PayloadAction} from '@reduxjs/toolkit';
import {User} from '@app/type/User/User';

const initialState: Partial<User> = {};

export enum UserActionType {
  ADD_USER_ACTION = 'ADD_USER_ACTION'
}

const UserAction = (state = initialState, action: PayloadAction<User>): Partial<User> => {
  switch (action.type) {
    case UserActionType.ADD_USER_ACTION:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default UserAction;
