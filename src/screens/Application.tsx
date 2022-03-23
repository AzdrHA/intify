import React, {FC, useEffect} from 'react';
import {useAppSelector} from '@app/reducers/hook';
import {ServerSide} from '@components/ServerSide/ServerSide';
import {User} from '@app/Type/User';
import {useParams} from 'react-router-dom';
import {UserInformation} from '@components/UserInformation/UserInformation';
import {ChannelSide} from '@components/ChannelSide/ChannelSide';

type ApplicationProps = {
  view: 'private' | 'guild'
}

type GuildRouter = {
  guild: string;
  channel: string;
}

export const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
  const userInfo: User = useAppSelector((state) => state.user);
  const params = useParams<Partial<GuildRouter>>();

  useEffect(() => {
    console.log(params.guild);
    console.log(userInfo);
  }, [params.guild]);

  return (
    <div className="max-h-screen min-h-screen max-w-max grid grid-flow-col auto-cols-max">
      <ServerSide guilds={userInfo.guilds}/>
      <div className="w-56 bg-dark-200 grid grid-rows-3 grid-flow-col gap-3 overflow-hidden">
        <div className="bg-bermuda overflow-hidden">
          ccccccc
        </div>
        <div className="flex-1 px-2 overflow-hidden overflow-y-auto">
          <>
            <ChannelSide/>
          </>
        </div>
        <div className="overflow-hidden">
          <>
            <UserInformation/>
          </>
        </div>
      </div>
    </div>
  );
};
