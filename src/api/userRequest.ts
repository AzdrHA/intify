import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {UserLoginRequest} from '@app/type/Api/UserRequest';
import {LoginRes} from '@app/type/Auth/LoginRes';
import {User} from '@app/type/User/User';

export const userLoginRequest = (data: UserLoginRequest): Promise<LoginRes> => {
  return makeRequest(ApiConfig.auth.login, 'POST', data, false);
};

export const userAccountRequest = () : Promise<User> => {
  return makeRequest(ApiConfig.users.account, 'GET');
};

