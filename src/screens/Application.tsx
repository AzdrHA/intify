import React, {FC, useEffect} from 'react';
import {useAppSelector} from '@app/reducers/hook';
import {ServerSide} from '@components/ServerSide/ServerSide';
import {User} from '@app/Type/User';

type ApplicationProps = {
  view: 'private' | 'guild'
}

export const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
  const userInfo: User = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <div className="max-h-screen min-h-screen max-w-max grid grid-cols-3">
      <ServerSide guilds={userInfo.guilds}/>
    </div>
  );
};
