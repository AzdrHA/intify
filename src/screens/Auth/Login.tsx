import React from 'react';
import {Form, Field} from 'react-final-form';
import Cookies from 'js-cookie';
import {useAppDispatch} from '@app/reducers/hook';
import {useNavigate} from 'react-router-dom';
import {UserActionType} from '@app/actions/UserAction';
import {userLoginRequest} from '@app/api/userRequest';
import {UserLoginRequest} from '@app/type/Api/UserRequest';
import {GuildMemberActionType} from '@app/actions/GuildMemberAction';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitLoginForm = (data: UserLoginRequest) => {
    userLoginRequest(data).then((user) => {
      Cookies.set('token', user.token, {
        expires: 1,
      });
      // dispatch({type: UserActionType.ADD_USER_ACTION, payload: user});
      // dispatch({type: GuildMemberActionType.ADD_GUILD_ACTION, payload: user.members});
      navigate('/@me');
    });
  };

  return (
    <Form
      onSubmit={submitLoginForm}
      validate={(values) => {
        const errors: {email?: string, password?: string} = {};
        return errors;
      }}
      render={({submitError,
        handleSubmit,
        form,
        submitting,
        pristine,
        values}) => (
        <form onSubmit={handleSubmit}>
          <Field name={'email'} render={({input, meta}) => (
            <div>
              <label htmlFor="email">email address</label>
              <input required id={'email'} type={'email'} {...input} placeholder="exemple@exemple.com" />
            </div>
          )}/>

          <Field name={'password'} render={({input, meta}) => (
            <div>
              <label htmlFor="password">password</label>
              <input required id={'password'} type={'password'} {...input} />
            </div>
          )}/>

          <button type="submit">sign in</button>
        </form>
      )}
    />
  );
};
