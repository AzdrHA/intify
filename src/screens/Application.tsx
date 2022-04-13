import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '@app/reducers/hook';
import {ServerSide} from '@components/ServerSide/ServerSide';
import {HeaderGuildName} from '@components/Guild/HeaderGuildName/HeaderGuildName';
import {HeaderDM} from '@components/DM/HeaderDM/HeaderDM';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/Type/GuildRouter';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/ApiConfig';
import {Guild} from '@app/Type/Guild';

type ApplicationProps = {
  view: 'private' | 'guild'
}

export const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
  const userInfo = useAppSelector((state) => state.user);
  const urlParams = useParams<GuildRouter>();
  const [guild, setGuild] = useState<Guild|null>();

  useEffect(() => {
    if (urlParams.guild) {
      makeRequest(ApiConfig.guilds.get(urlParams.guild), 'GET').then((r) => setGuild(r));
    }
  }, [urlParams]);

  return (
    <div className="max-h-screen min-h-screen max-w-max grid grid-flow-col auto-cols-max w-full">
      <ServerSide guildMembers={userInfo.members}/>
      <div className="w-56 bg-dark-200 grid grid-rows-3 grid-flow-col gap-3 overflow-hidden">
        <div className="bg-bermuda overflow-hidden h-12">
          {
            (props.view === 'guild' && guild) ? <HeaderGuildName name={guild.name}/> : <HeaderDM/>
          }
        </div>
        {/* <div className="px-2 overflow-hidden overflow-y-auto">
          <>
            <ChannelSide/>
          </>
        </div>
        <div className="overflow-hidden h-5">
          <>
            <UserInformation/>
          </>
        </div>*/}
      </div>
      <div className={'grid-cols-none'}>
        <div className="bg-bermuda overflow-hidden h-12">
          ccc
        </div>
      </div>
    </div>
  );
};
