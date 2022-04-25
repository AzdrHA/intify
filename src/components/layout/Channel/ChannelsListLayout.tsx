import React, {FC, useEffect, useRef, useState} from 'react';
import {UtilsStr} from '@app/utils/UtilsStr';
import {useParams} from 'react-router';
import {routesConfig} from '@app/config/routesConfig';
import {useNavigate} from 'react-router-dom';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {Channel} from '@app/type/Channel/Channel';
import {ChannelType} from '@app/type/Channel/ChannelType';
import {HashTagIcon} from '@components/style/icon/HashTagIcon';
import {SpeakerIcon} from '@components/style/icon/SpeakerIcon';
import {ChannelSideProps} from '@app/type/Props/ChannelSideProps';

export const ChannelsListLayout: FC<ChannelSideProps> = (props: ChannelSideProps) => {
  const urlParams = useParams<GuildRouter>();
  const channelRef = useRef<HTMLDivElement[]>([]);
  const [current, setCurrent] = useState<HTMLDivElement>();
  const location = useNavigate();

  const clickChannel = (channel: HTMLDivElement) => {
    if (current === channel) return;
    if (current && current.classList.contains('selected')) {
      current.classList.remove('selected');
    }
    channel.classList.add('selected');
    // if (params.guild && params.channel) UtilsLocalStorage.setItem(params.guild, params.channel);
    setCurrent(channel);
  };

  useEffect(() => {
    const currentChannel = props.channels.find((channel) => channel.id == String(urlParams.channel));
    if (currentChannel) {
      const channel = channelRef.current[props.channels.indexOf(currentChannel)];
      clickChannel(channel);
    }
  }, [urlParams.guild]);

  const channelClick = (channel: Channel, channelHtml: HTMLDivElement) => {
    if (channel.type !== ChannelType.GUILD_TEXT) return;
    clickChannel(channelHtml);
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
        })
      }
    </>
  );
};
