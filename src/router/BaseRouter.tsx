import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Login} from '@screens/Login';
import {Register} from '@screens/Register';
import {routes} from '@app/router/routes';
import {AppRouter} from '@app/router/AppRouter';

export const BaseRouter = () => {
  return <Routes>
    <Route path={routes.auth.login} element={<Login />} />
    <Route path={routes.auth.register} element={<Register />} />
    <Route path={'/*'} element={<AppRouter />} />
  </Routes>;
};
