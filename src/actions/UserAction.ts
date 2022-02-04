import {User} from '@app/Type/User';
import {AnyAction} from 'redux';

const initialState: Partial<User> = {};

export type UserAction = 'ADD_USER_ACTION'

/**
 * @param {initialState} state
 * @param {AnyAction} action
 * @return {User}
 */
const UserAction = (state = {...initialState}, action: AnyAction) => {
  switch (action.type) {
    case 'ADD_USER_ACTION':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default UserAction;
