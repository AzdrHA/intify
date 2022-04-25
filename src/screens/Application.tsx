import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '@app/reducers/hook';
import {ServerSide} from '@components/layout/ServerSide';
import {useParams} from 'react-router';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {ApplicationProps} from '@app/type/Props/ApplicationProps';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {Guild} from '@app/type/Guild/Guild';
import {ChannelSideLayout} from '@components/layout/Channel/ChannelSideLayout';
import {ChatLayout} from '@components/layout/Chat/ChatLayout';
import {ServerCreateModal} from '@components/modal/ServerCreateModal';

export const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
  const userInfo = useAppSelector((state) => state.user);
  const urlParams = useParams<GuildRouter>();
  const [guild, setGuild] = useState<Guild>();

  useEffect(() => {
    if (urlParams.guild) makeRequest(ApiConfig.guilds.get(urlParams.guild), 'GET').then((r) => setGuild(r));
  }, [urlParams.guild]);

  return (
    <div className="max-h-screen min-h-screen max-w-max w-full app-content">
      <>
        <ServerSide members={userInfo.members}/>
      </>
      <div className="baseGuild">
        <>
          <ChannelSideLayout guild={guild} {...props}/>
        </>
        {
          guild && <>
            <div className="w-full section-chat-content">
              {
                    (props.view === 'guild' && guild && guild.channels) ?
                      <ChatLayout guild={guild}/> : null
              }
            </div>
          </>
        }
      </div>
    </div>
  );
};
