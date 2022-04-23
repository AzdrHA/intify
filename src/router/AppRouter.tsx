import React, {useEffect, useState} from 'react';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {useAppDispatch, useAppSelector} from '@app/reducers/hook';
import {Route, Routes} from 'react-router-dom';
import {routesConfig} from '@app/config/routesConfig';
import {Application} from '@screens/Application';
import {Loading} from '@components/style/loading/Loading';

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
    <Route path={routesConfig.app.home} element={<Application view={'private'}/>}/>
    <Route path={routesConfig.app.chat} element={<Application view={'guild'}/>}/>
  </Routes>;
};
