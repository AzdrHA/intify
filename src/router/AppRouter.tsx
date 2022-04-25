import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routesConfig} from '@app/config/routesConfig';
import {Application} from '@screens/Application';
import {Loading} from '@components/style/loading/Loading';
import {useDispatch} from 'react-redux';
import {userSlice} from '@components/slice/UserSlice';
import {userAccountRequest} from '@app/api/userRequest';
import {guildMember} from '@components/slice/GuildMemberSlice';

export const AppRouter = () => {
  const [isLoad, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    userAccountRequest().then((user) => {
      dispatch(userSlice.actions.increment(user));
      dispatch(guildMember.actions.setDefault(user.members));
      setLoad(true);
    });
  }, []);

  return !isLoad ? <Loading/> : <Routes>
    <Route path={routesConfig.app.home} element={<Application view={'private'}/>}/>
    <Route path={routesConfig.app.chat} element={<Application view={'guild'}/>}/>
  </Routes>;
};
