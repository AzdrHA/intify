import React, {forwardRef, ForwardRefRenderFunction, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {routesConfig} from '@app/config/routesConfig';
import {generatePath, useParams} from 'react-router';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {ChannelType} from '@app/type/Channel/ChannelType';
import {HomeIcon} from '@components/style/icon/HomeIcon';
import {PlusIcon} from '@components/style/icon/PlusIcon';
import {ServerButtonProps} from '@app/type/Props/ServerButtonProps';
import {ServerCreateModal} from '@components/modal/ServerCreateModal';

const ServerButton: ForwardRefRenderFunction<HTMLDivElement, ServerButtonProps> = ((props, serverRef) => {
  const location = useNavigate();
  const urlParams = useParams<GuildRouter>();
  const [modalVisible, setModalVisible] = useState(false);

  const tooltip: React.MouseEventHandler<HTMLElement> = (e) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = String(props.guild?.name ?? props.name);
    tooltip.style.left = e.currentTarget.getBoundingClientRect().right + 20 + 'px';
    tooltip.style.top = e.currentTarget.getBoundingClientRect().top + (e.currentTarget.getBoundingClientRect().height / 4.5) + 'px';
    document.body.append(tooltip);

    e.currentTarget.addEventListener('mouseleave', () => {
      tooltip.remove();
    });

    e.currentTarget.addEventListener('click', () => {
      tooltip.remove();
    });
  };

  const onClick = () => {
    if (props.type === 'ADD') return setModalVisible(true);
    props.onClick(props.index);
    if (props.type === 'HOME') return location('/@me');
    if (props.type === 'SERVER' && (props.guild && (urlParams.guild !== props.guild.id.toString()))) {
      const firstTextChannel = props.guild.channels?.filter((channel) => channel.type === ChannelType.GUILD_TEXT);
      location(generatePath(routesConfig.app.chat, {guild: props.guild.id, channel: firstTextChannel[0].id}));
    }
  };

  return (
    <div
      className={'server-button-container'}
      ref={serverRef}
    >
      {
        modalVisible ? <ServerCreateModal toggleModal={() => setModalVisible(false)}/> : null
      }
      <div className="testTransition w-11 h-11 text-primary rounded-50 hover:rounded hover:bg-primary hover:text-white bg-dark mx-auto my-1.5 cursor-pointer relative">
        <button onClick={onClick} onMouseEnter={tooltip}
          className="flex justify-center items-center h-full w-full overflow-hidden text-tiny">
          {
            !props.guild ? <div className="mr-0.5">
              {props.type === 'HOME' ? <HomeIcon/> : <PlusIcon/>}
            </div> : <div>{props.guild.name.split(/ +/g).map((item) => item.substring(0, 1)).join('')}</div>
          }
        </button>
      </div>
    </div>
  );
});

export default forwardRef(ServerButton);
