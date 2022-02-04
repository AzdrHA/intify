import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '@app/router/routes';
import {mockAccount} from '../../__mock__/MockServiceApi';
import {Loading} from '@components/Loading/Loading';
import {useAppDispatch, useAppSelector} from '@app/reducers/hook';
import {Application} from '@screens/Application';

export const AppRouter = () => {
  const [isLoad, setLoad] = useState(false);
  const [error, setError] = useState();
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userInfo.id) {
      mockAccount().then((user) => {
        dispatch({
          type: 'ADD_USER_ACTION', payload: {
            id: user.id,
            username: user.username,
            status: user.status,
            token: 'Coucou',
            guilds: user.guilds,
            image: user.image,
          },
        });
        setLoad(true);
      }).catch((e) => setError(e));
    } else {
      setLoad(true);
    }
  }, []);

  return !isLoad ? <Loading/> : <Routes>
    <Route path={routes.app.home} element={<Application view={'private'}/>}/>
    <Route path={routes.app.chat} element={<Application view={'guild'}/>}/>
  </Routes>;
};
