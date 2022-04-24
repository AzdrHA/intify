import {HeaderGuildName} from '@components/Guild/HeaderGuildName/HeaderGuildName';
import {HeaderDM} from '@components/DM/HeaderDM/HeaderDM';
import {UserFriendsSide} from '@components/UserFriendsSide/UserFriendsSide';
import {UserInformation} from '@components/UserInformation/UserInformation';
import React, {FC} from 'react';
import {ApplicationProps} from '@app/type/Props/ApplicationProps';
import {Guild} from '@app/type/Guild/Guild';
import {ChannelsListLayout} from '@components/layout/Channel/ChannelsListLayout';

interface Yolo extends ApplicationProps {
  guild: Guild | undefined
}

export const ChannelSideLayout: FC<Yolo> = (props: Yolo) => {
  return (
    <div className="bg-dark-200 section-direct-message-container">
      <div className="bg-dark-200 overflow-hidden h-12 server-name-container">
        <div className={'server-name-content text-white'}>
          {
            (props.view === 'guild' && props.guild) ? <HeaderGuildName name={props.guild.name}/> : <HeaderDM/>
          }
        </div>
      </div>
      <>
        {
          (props.view === 'guild' && props.guild && props.guild.channels) ?
            <ChannelsListLayout channels={props.guild.channels}/> : <UserFriendsSide/>
        }
        {}
      </>
      <div className="overflow-hidden h-12 user-info-cotnainer">
        <UserInformation/>
      </div>
    </div>
  );
};
