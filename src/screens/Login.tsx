import React from 'react';
import {Form, Field} from 'react-final-form';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/ApiConfig';
import {LoginRes} from '@app/Type/Auth/LoginRes';
import Cookies from 'js-cookie';
import {useAppDispatch} from '@app/reducers/hook';
import {useNavigate} from 'react-router-dom';
import {UserActionType} from '@app/actions/UserAction';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitLoginForm = (data: { email: string, password: string }) => {
    makeRequest(ApiConfig.auth.login, 'POST', {
      'email': data.email,
      'password': data.password,
    }, false).then((user: LoginRes) => {
      Cookies.set('token', user.token, {
        expires: 1,
      });
      dispatch({type: UserActionType.ADD_USER_ACTION, payload: user});
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
