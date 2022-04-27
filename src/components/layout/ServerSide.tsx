import React, {useEffect, useRef} from 'react';
import ServerButton from '@components/style/button/ServerButton';
import {Divider} from '@components/style/divider';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/reducers/store';
import {createGuildSubscription} from '@app/mercure/subscription/Guild/guildSubscription';
import {guildMemberSlice} from '@app/slice/GuildMemberSlice';

export const ServerSide = () => {
  const serverRef = useRef<HTMLDivElement[]>([]);
  const guildMember = useSelector((state: RootState) => state.guildMemberSlice);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    serverRef.current[0].classList.add('active');

    /* createGuildSubscription(user.id as string, (e) => {
      dispatch(guildMemberSlice.actions.setDefault(e));
    });*/
  }, []);

  const onClick = (index: number) => {
    serverRef.current.map((div) => {
      if (div.classList.contains('active')) {
        div.classList.remove('active');
      }
    });
    serverRef.current[index].classList.add('active');
  };

  return (
    <div className="bg-dark-100 section-server-container">
      <div className="py-1.5">
        <ServerButton
          ref={(ref) => serverRef.current[0] = ref as HTMLDivElement}
          name={'Home'}
          type={'HOME'}
          onClick={onClick}
          index={0}
        />

        {
          guildMember.length ? <Divider extraClass={'w-5/12 h-0.5 my-1 mx-auto'}/> : null
        }

        {
          guildMember.map((guild, i) => {
            return (
              <ServerButton
                ref={(ref) => serverRef.current[i+1] = ref as HTMLDivElement}
                {...guild}
                type={'SERVER'}
                key={i}
                index={i+1}
                onClick={onClick}
              />
            );
          })
        }

        <Divider extraClass={'w-5/12 h-0.5 my-1 mx-auto'}/>

        <ServerButton
          ref={(ref) => serverRef.current[guildMember.length+1] = ref as HTMLDivElement}
          name={'Add server'}
          type={'ADD'}
          onClick={onClick}
          index={guildMember.length+1}
        />
      </div>
    </div>
  );
};
