import React, {FC} from 'react';
import {HomeIcon} from '@components/Icons/HomeIcon';
import {PlusIcon} from '@components/Icons/PlusIcon';
import {useNavigate} from 'react-router-dom';
import {Member} from '@app/Type/Member';
import {routes} from '@app/router/routes';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/Type/GuildRouter';

interface ServerButtonProps extends Partial<Member> {
  type: 'HOME' | 'SERVER' | 'ADD';
  name: string;
}

export const ServerButton: FC<ServerButtonProps> = (props: ServerButtonProps) => {
  const location = useNavigate();
  const urlParams = useParams<GuildRouter>();

  const tooltip: React.MouseEventHandler<HTMLElement> = (e) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = String(props.guild?.name);
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
    if (props.type === 'HOME') return location('/@me');
    if (props.type === 'SERVER' && (props.guild && (urlParams.guild !== props.guild.id.toString()))) {
      location(
          routes.app.chat
              .replace(':guild', props.guild.id)
              .replace(':channel', props.guild.id),
      );
    }
  };

  return (
    <div
      className="testTransition w-12 h-12 text-primary rounded-50 hover:rounded bg-dark hover:bg-primary hover:text-white mx-auto my-1.5 cursor-pointer relative">
      <button onClick={onClick} onMouseEnter={tooltip}
        className="flex justify-center items-center h-full w-full overflow-hidden">
        {
          props.type !== 'SERVER' ? <div className="mr-0.5">
            {props.type === 'HOME' ? <HomeIcon/> : <PlusIcon/>}
          </div> : <div>{props.name.split(/ +/g).map((item) => item.substring(0, 1)).join('')}</div>
        }
      </button>
    </div>
  );
};
