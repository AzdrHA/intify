import React, {FC, useEffect, useState} from 'react';
import {ServerSide} from '@components/layout/ServerSide';
import {useParams} from 'react-router';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {ApplicationProps} from '@app/type/Props/ApplicationProps';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {Guild} from '@app/type/Guild/Guild';
import {ChannelSideLayout} from '@components/layout/Channel/ChannelSideLayout';
import {ChatLayout} from '@components/layout/Chat/ChatLayout';
import {FriendsView} from '@components/private/FriendsView/FriendsView';

export const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
  const urlParams = useParams<GuildRouter>();
  const [guild, setGuild] = useState<Guild|null>(null);

  useEffect(() => {
    if (!urlParams.guild) setGuild(null);
    if (urlParams.guild) {
      makeRequest(ApiConfig.guilds.get(urlParams.guild), 'GET').then((r) => setGuild(r));
    }
  }, [urlParams.channel]);

  return (
    <div className="max-h-screen min-h-screen max-w-max w-full app-content">
      <>
        <ServerSide/>
      </>
      <div className="baseGuild">
        {
          guild && <>
            <>
              <ChannelSideLayout guild={guild} {...props}/>
            </>

            <div className="w-full section-chat-content">
              {
                    (props.view === 'guild' && guild && guild.channels) ?
                      <ChatLayout guild={guild}/> : <FriendsView/>
              }
            </div></>
        }
      </div>
    </div>
  );
};
