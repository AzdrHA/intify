import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login} from '@screens/Login';
import {Register} from '@screens/Register';
import {routes} from '@app/router/routes';
import {AppRouter} from '@app/router/AppRouter';
import {createBrowserHistory} from 'history';

export const BaseRouter = () => {
  const history = createBrowserHistory();

  useEffect(() => {
    if (history.location.pathname === '/') {
      history.push('/@me');
    }
  }, []);


  return <Routes>
    <Route path={routes.auth.login} element={<Login/>}/>
    <Route path={routes.auth.register} element={<Register/>}/>
    <Route path={'/*'} element={<AppRouter/>}/>
  </Routes>;
};
