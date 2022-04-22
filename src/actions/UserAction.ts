import {User} from '@app/type/User/User';
import {PayloadAction} from '@reduxjs/toolkit';

const initialState: Partial<User> = {};

export enum UserActionType {
  ADD_USER_ACTION = 'ADD_USER_ACTION'
}

/**
 * @param {initialState} state
 * @param {PayloadAction<User, UserActionType>} action
 * @return {User}
 */
const UserAction = (state: Partial<User> = {...initialState}, action: PayloadAction<Partial<User>, UserActionType>): Partial<User> => {
  switch (action.type) {
    case UserActionType.ADD_USER_ACTION:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default UserAction;
