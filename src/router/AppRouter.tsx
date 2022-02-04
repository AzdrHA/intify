import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home} from '@screens/Home';
import {Chat} from '@screens/Chat';
import {routes} from '@app/router/routes';
import {createBrowserHistory} from 'history';

export const AppRouter = () => {
  const {location} = createBrowserHistory();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return <Routes>
    <Route path={routes.app.home} element={<Home />} />
    <Route path={routes.app.chat} element={<Chat />} />
  </Routes>;
};
