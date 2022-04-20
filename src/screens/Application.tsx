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
import {ChannelSide} from '@components/ChannelSide/ChannelSide';
import {UserFriendsSide} from '@components/UserFriendsSide/UserFriendsSide';
import {HeaderGuildChat} from '@components/Guild/HeaderGuildChat/HeaderGuildChat';
import {UserInformation} from '@components/UserInformation/UserInformation';
import {HashTagIcon} from '@components/Icons/HashTagIcon';
import {Chat} from '@components/Chat/Chat';

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
    <div className="max-h-screen min-h-screen max-w-max w-full app-content">
      <ServerSide guildMembers={userInfo.members}/>
      <div className="baseGuild">
        <div className="bg-dark-200 section-direct-message-container">
          <div className="bg-dark-200 overflow-hidden h-12 server-name-container">
            <div className={'server-name-content text-white'}>
              {
                (props.view === 'guild' && guild) ? <HeaderGuildName name={guild.name}/> : <HeaderDM/>
              }
            </div>
          </div>
          <>
            {
              (props.view === 'guild' && guild && guild.channels) ?
                <ChannelSide channels={guild.channels}/> : <UserFriendsSide/>
            }
          </>
          <div className="overflow-hidden user-info-cotnainer">
            <UserInformation/>
          </div>
        </div>
        <div className="w-full section-chat-content">
          {
            (props.view === 'guild' && guild && guild.channels) ?
              <Chat guild={guild}/> : null
          }
        </div>
      </div>
    </div>
  );
};
