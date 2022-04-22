import React, {FC, useEffect, useRef, useState} from 'react';
import {Channel, ChannelType} from '@app/Type/Channel/Channel';
import {UtilsStr} from '@app/utils/UtilsStr';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/Type/Router/GuildRouter';
import {HashTagIcon} from '@components/style/Icons/HashTagIcon';
import {SpeakerIcon} from '@components/style/Icons/SpeakerIcon';
import {routesConfig} from '@app/config/routesConfig';
import {useNavigate} from 'react-router-dom';

type ChannelSideProps = {
  channels: Channel[]
}

export const ChannelSide: FC<ChannelSideProps> = (props: ChannelSideProps) => {
  const params = useParams<GuildRouter>();
  const channelRef = useRef<HTMLDivElement[]>([]);
  const [current, setCurrent] = useState<HTMLDivElement>();
  const location = useNavigate();

  const clickChannel = (channel: HTMLDivElement, channelInfo: Channel) => {
    if (current === channel) return;

    if (current && current.classList.contains('selected')) {
      current.classList.remove('selected');
    }

    channel.classList.add('selected');
    setCurrent(channel);
  };

  useEffect(() => {
    const currentChannel = props.channels.find((channel) => channel.id == String(params.channel));
    if (currentChannel) {
      const channel = channelRef.current[props.channels.indexOf(currentChannel)];
      clickChannel(channel, currentChannel);
    }
  }, []);

  const channelClick = (channel: Channel, channelHtml: HTMLDivElement) => {
    if (channel.type !== ChannelType.GUILD_TEXT) return;
    clickChannel(channelHtml, channel);
    location(
        routesConfig.app.chat
            .replace(':guild', String(params.guild))
            .replace(':channel', channel.id));
  };

  return (
    <div className={'mx-2 my-2 channel-section-container'}>
      <div className={'channel-section-content'}>
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
      </div>
    </div>
  );
};
