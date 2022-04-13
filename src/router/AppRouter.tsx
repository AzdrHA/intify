import React, {useEffect, useState} from 'react';
import {Loading} from '@components/Loading/Loading';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/ApiConfig';
import {useAppDispatch, useAppSelector} from '@app/reducers/hook';
import {Route, Routes} from 'react-router-dom';
import {routes} from '@app/router/routes';
import {Application} from '@screens/Application';

export const AppRouter = () => {
  const userInfo = useAppSelector((state) => state.user);
  const [isLoad, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo) {
      makeRequest(ApiConfig.users.account, 'GET').then((user) => {
        dispatch({type: 'ADD_USER_ACTION', payload: user});
        setLoad(true);
      });
    }
  }, []);

  return !isLoad ? <Loading/> : <Routes>
    <Route path={routes.app.home} element={<Application view={'private'}/>}/>
    <Route path={routes.app.chat} element={<Application view={'guild'}/>}/>
  </Routes>;
};
