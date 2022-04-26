import {Field, Form} from 'react-final-form';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserLoginRequest} from '@app/type/Api/UserRequest';
import {userLoginRequest} from '@app/api/userRequest';
import Cookies from 'js-cookie';

export const LoginForm = () => {
  const navigate = useNavigate();

  const submitLoginForm = (data: UserLoginRequest) => {
    userLoginRequest(data).then((user) => {
      Cookies.set('token', user.token, {
        expires: 1,
      });
      navigate('/@me');
    });
  };

  return <Form
    onSubmit={submitLoginForm}
    validate={() => {
      const errors: {email?: string, password?: string} = {};
      return errors;
    }}
    render={({handleSubmit}) => (
      <form onSubmit={handleSubmit}>
        <Field name={'email'} render={({input}) => (
          <div>
            <label htmlFor="email">email address</label>
            <input required id={'email'} type={'email'} {...input} placeholder="exemple@exemple.com" />
          </div>
        )}/>

        <Field name={'password'} render={({input}) => (
          <div>
            <label htmlFor="password">password</label>
            <input required id={'password'} type={'password'} {...input} />
          </div>
        )}/>

        <button type="submit">sign in</button>
      </form>
    )}
  />;
};
