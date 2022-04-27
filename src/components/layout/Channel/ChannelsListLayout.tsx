import React, {FC, useEffect, useRef, useState} from 'react';
import {generatePath, useParams} from 'react-router';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {ChannelSideProps} from '@app/type/Props/ChannelSideProps';
import {useNavigate} from 'react-router-dom';
import {ChannelType} from '@app/type/Channel/ChannelType';
import {HashTagIcon} from '@components/style/icon/HashTagIcon';
import {SpeakerIcon} from '@components/style/icon/SpeakerIcon';
import {UtilsStr} from '@app/utils/UtilsStr';
import {PlusIcon} from '@components/style/icon/PlusIcon';
import {routesConfig} from '@app/config/routesConfig';
import {Channel} from '@app/type/Channel/Channel';

export const ChannelsListLayout: FC<ChannelSideProps> = (props: ChannelSideProps) => {
  const urlParams = useParams<GuildRouter>();
  const channelRef = useRef<HTMLDivElement[]>([]);
  const location = useNavigate();

  useEffect(() => {
    const currentChannel = props.channels.find((channel) => channel.id == String(urlParams.channel));
    if (currentChannel) {
      addChannelStyle(props.channels.indexOf(currentChannel));
    }
  }, [urlParams.channel]);

  const addChannelStyle = (index: number) => {
    channelRef.current.map((div) => {
      if (div.classList.contains('selected')) {
        div.classList.remove('selected');
      }
    });
    channelRef.current[index].classList.add('selected');
  };

  const channelClick = (channel: Channel, index: number) => {
    if (channel.type !== ChannelType.GUILD_TEXT) return;
    addChannelStyle(index);
    location(
        routesConfig.app.chat
            .replace(':guild', String(urlParams.guild))
            .replace(':channel', channel.id));
  };

  return (
    <>
      {
        props.channels.map((channel, i) => {
          return <div
            key={i}
            onClick={() => channelClick(channel, i)}
            className={`relative channel-container ${ChannelType[channel.type]}`}
            ref={(ref) => channelRef.current[i] = ref as HTMLDivElement}>
            {
              channel.type === ChannelType.GUILD_CATEGORY ?
                <div className={'float-right mt-1'}>
                  <button className={'my-auto'}>
                    <PlusIcon/>
                  </button>
                </div> : null
            }
            <div
              className={`channel ${ChannelType[channel.type]} ${channel.type === ChannelType.GUILD_CATEGORY ? 'flex-col-reverse items-start' : ''}`}>
              {
                channel.type === ChannelType.GUILD_TEXT ?
                  <HashTagIcon/> : channel.type === ChannelType.GUILD_VOICE ?
                    <SpeakerIcon/> : null
              }
              <div
                className={channel.type === ChannelType.GUILD_CATEGORY ? 'channel-name category w-full relative' : 'channel-name w-full relative'}>
                {UtilsStr.formatToChannelName(channel.name)}
              </div>
            </div>
          </div>;
        })
      }
    </>
  );
};

/*
return <div
onClick={() => channelClick(channel, channelRef.current[i])}
className={`channel-container ${ChannelType[channel.type]}`}
key={i}
ref={(ref) => channelRef.current[i] = ref as HTMLDivElement}>
<div className={`channel ${ChannelType[channel.type]}`}>
  {
    channel.type === ChannelType.GUILD_TEXT ? <HashTagIcon/> : channel.type === ChannelType.GUILD_VOICE ?
      <SpeakerIcon/> : null
  }
  <div className={channel.type === ChannelType.GUILD_CATEGORY ? 'channel-name category' : 'channel-name'}>
    {UtilsStr.formatToChannelName(channel.name)}
  </div>
</div>
</div>;
 */
