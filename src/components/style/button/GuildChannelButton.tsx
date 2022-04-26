import {ChannelType} from '@app/type/Channel/ChannelType';
import {HashTagIcon} from '@components/style/icon/HashTagIcon';
import {SpeakerIcon} from '@components/style/icon/SpeakerIcon';
import {UtilsStr} from '@app/utils/UtilsStr';
import React, {forwardRef, ForwardRefRenderFunction, LegacyRef, useState} from 'react';
import {Channel} from '@app/type/Channel/Channel';
import {generatePath, useParams} from 'react-router';
import {routesConfig} from '@app/config/routesConfig';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {useNavigate} from 'react-router-dom';
import {PlusIcon} from '@components/style/icon/PlusIcon';
import {ServerCreateModal} from '@components/modal/ServerCreateModal';
import {GuildChannelCreateModal} from '@components/modal/GuildChannelCreateModal';

type GuildChannelButtonProps = {
  channel: Channel;
  ref: LegacyRef<HTMLDivElement>;
  index: number;
}

const GuildChannelButton: ForwardRefRenderFunction<HTMLDivElement, GuildChannelButtonProps> = ((props, ref) => {
  const urlParams = useParams<GuildRouter>();
  const location = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const onClick = (channel: Channel) => {
    if (channel.type !== ChannelType.GUILD_TEXT) return;
    location(generatePath(routesConfig.app.chat, {
      guild: urlParams.guild,
      channel: channel.id,
    }));
  };

  const Channel = (channelProps: {
    channel: Channel,
  }): JSX.Element => {
    return <div
      onClick={() => onClick(channelProps.channel)}
      className={`relative channel-container ${ChannelType[channelProps.channel.type]}`}
      ref={ref}
    >
      {
        modalVisible ? <GuildChannelCreateModal parent={channelProps.channel.id} toggleModal={() => setModalVisible(false)}/> : null
      }
      {
        channelProps.channel.type === ChannelType.GUILD_CATEGORY ?
          <div className={'absolute top-0 right-0 w-5 h-5 bg-green-500'}>
            <button className={'w-full h-full bg-pink-500'} onClick={() => setModalVisible(true)}>
              <PlusIcon/>
            </button>
          </div> : null
      }
      <div
        className={`channel ${ChannelType[channelProps.channel.type]} ${channelProps.channel.type === ChannelType.GUILD_CATEGORY ? 'flex-col-reverse items-start' : ''}`}>
        {
          channelProps.channel.type === ChannelType.GUILD_CATEGORY ?
            <div className={'children w-full'}>
              {
                channelProps.channel.children?.map((channel, i) => {
                  return <Channel channel={channel} key={i}/>;
                })
              }
            </div> : null
        }
        {
          channelProps.channel.type === ChannelType.GUILD_TEXT ?
            <HashTagIcon/> : channelProps.channel.type === ChannelType.GUILD_VOICE ?
              <SpeakerIcon/> : null
        }
        <div
          className={channelProps.channel.type === ChannelType.GUILD_CATEGORY ? 'channel-name category w-full relative' : 'channel-name w-full relative'}>
          {UtilsStr.formatToChannelName(channelProps.channel.name)}
        </div>
      </div>
    </div>;
  };

  return <Channel channel={props.channel}/>;
});

export default forwardRef(GuildChannelButton);
