import React from 'react';
import {useAppSelector} from '@app/reducers/hook';

export const UserInformation = () => {
  const userInfo = useAppSelector((state) => state.user);

  return (
    <div className={'bg-dark-200 text-white ml-2'}>
      {userInfo.username}
    </div>
  );
};
