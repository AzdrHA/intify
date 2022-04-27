import {Field, Form} from 'react-final-form';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserLoginRequest} from '@app/type/Api/UserRequest';
import {userLoginRequest} from '@app/api/userRequest';
import Cookies from 'js-cookie';
import {Input} from '@components/style/input/Input';
import {required} from '@components/form/FormValidation';

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
      <div className={'shadow form-base-container'}>
        <div className={'form-create-server-title-container p-3 pb-0'}>
          <h1 className={'form-create-server-title'}>Login</h1>
        </div>

        <form onSubmit={handleSubmit} autoComplete={'off'}>
          <div className={'px-3'}>
            <Field validate={required} name={'email'} render={({input, meta}) => (
              <Input required={true} id={'email'} input={input} meta={meta} label={'email address'} placeholder={'exemple@exemple.com'}/>
            )}/>
          </div>

          <div className={'py-3'}/>

          <div className={'px-3'}>
            <Field validate={required} name={'password'} render={({input, meta}) => (
              <Input required={true} id={'password'} input={input} meta={meta} label={'password'} />
            )}/>
          </div>

          <div className={'py-3'}/>

          <div className={'flex justify-end bg-pink-500 py-3 px-3 form-base-bottom text-tiny'}>
            <button className={'rounded bg-primary py-1 px-3 ml-5'} type="submit">Login</button>
          </div>
        </form>
      </div>
      // <form onSubmit={handleSubmit}>
      //   <div className={'shadow form-base-container'}>
      //     <Field name={'email'} render={({input}) => (
      //       <div>
      //         <label htmlFor="email">email address</label>
      //         <input required id={'email'} type={'email'} {...input} placeholder="exemple@exemple.com" />
      //       </div>
      //     )}/>
      //
      //     <Field name={'password'} render={({input}) => (
      //       <div>
      //         <label htmlFor="password">password</label>
      //         <input required id={'password'} type={'password'} {...input} />
      //       </div>
      //     )}/>
      //
      //     <button type="submit">sign in</button>
      //   </div>
      // </form>
    )}
  />;
};
