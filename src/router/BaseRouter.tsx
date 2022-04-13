import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Login} from '@screens/Login';
import {Register} from '@screens/Register';
import {routes} from '@app/router/routes';
import {AppRouter} from '@app/router/AppRouter';
import Cookies from 'js-cookie';

export const BaseRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    } else {
      navigate('/@me');
    }
  }, []);

  return <Routes>
    <Route path={routes.auth.login} element={<Login/>}/>
    <Route path={routes.auth.register} element={<Register/>}/>
    <Route path={'/*'} element={<AppRouter/>}/>
  </Routes>;
};
