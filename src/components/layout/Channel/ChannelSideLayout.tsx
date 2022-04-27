import {UserFriendsSide} from '@components/private/UserFriendsSide/UserFriendsSide';
import {UserInformation} from '@components/User/UserInformation/UserInformation';
import React, {FC} from 'react';
import {ApplicationProps} from '@app/type/Props/ApplicationProps';
import {Guild} from '@app/type/Guild/Guild';
import {ChannelsListLayout} from '@components/layout/Channel/ChannelsListLayout';
import {HeaderGuildName} from '@components/guild/HeaderGuildName/HeaderGuildName';

interface Yolo extends ApplicationProps {
  guild: Guild | null
}

export const ChannelSideLayout: FC<Yolo> = (props: Yolo) => {
  return (
    <div className="bg-dark-200 section-direct-message-container">
      {
        (props.view === 'guild' && props.guild) ? <div className="bg-dark-200 overflow-hidden h-12 server-name-container">
          <div className={'server-name-content text-white'}>
            {
              <HeaderGuildName name={props.guild.name}/>
            }
          </div>
        </div> : null
      }

      <div className={'mx-2 my-2 channel-section-container'}>
        <div className={'channel-section-content'}>
          {
              (props.view === 'guild' && props.guild && props.guild.channels) ?
                <ChannelsListLayout channels={props.guild.channels}/> : <UserFriendsSide/>
          }
        </div>
      </div>

      <div className="overflow-hidden h-12 user-info-cotnainer">
        <UserInformation/>
      </div>
    </div>
  );
};
