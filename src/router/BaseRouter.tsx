import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Login} from '@screens/Auth/Login';
import {Register} from '@screens/Auth/Register';
import {routesConfig} from '@app/config/routesConfig';
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
    <Route path={routesConfig.auth.login} element={<Login/>}/>
    <Route path={routesConfig.auth.register} element={<Register/>}/>
    <Route path={'/*'} element={<AppRouter/>}/>
  </Routes>;
};
