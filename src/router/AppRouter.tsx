import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routesConfig} from '@app/config/routesConfig';
import {Application} from '@screens/Application';
import {Loading} from '@components/style/loading/Loading';
import {useDispatch} from 'react-redux';
import {userSlice} from '@components/../slice/UserSlice';
import {userAccountRequest} from '@app/api/userRequest';
import {guildMemberSlice} from '@components/../slice/GuildMemberSlice';
import {friendsSlice} from '@app/slice/FriendsSlice';

export const AppRouter = () => {
  const [isLoad, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    userAccountRequest().then((user) => {
      dispatch(userSlice.actions.increment(user));
      dispatch(guildMemberSlice.actions.setDefault(user.members));
      dispatch(friendsSlice.actions.setDefault(user.friends));
      setLoad(true);
    });
  }, []);

  return !isLoad ? <Loading/> : <Routes>
    <Route path={routesConfig.app.home} element={<Application view={'private'}/>}/>
    <Route path={routesConfig.app.chat} element={<Application view={'guild'}/>}/>
  </Routes>;
};
