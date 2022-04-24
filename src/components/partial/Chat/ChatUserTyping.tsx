import React, {FC} from 'react';
import {useAppSelector} from '@app/reducers/hook';
import {ChatUserTypingProps} from '@app/type/Props/Chat/ChatUserTypingProps';

export const ChatUserTyping: FC<ChatUserTypingProps> = (props: ChatUserTypingProps) => {
  const userInfo = useAppSelector((state) => state.user);

  return (
    <>
      {
        props.usersTyping.length ?
          <small className={'text-white text-xs opacity-80'}>
            {
              props.usersTyping.length <= 3 ?
                <>
                  {
                    props.usersTyping.map((v, i) => {
                      if (v.id !== userInfo.id) {
                        return <div key={i} className={'inline'}>
                          <strong
                            key={i}>{v.name}</strong> {i === 0 || i < props.usersTyping.length - 1 ? <>and </> : null}
                        </div>;
                      }
                    })
                  } {
                  props.usersTyping.length === 1 ? <>is typing</> : <>are typing...</>
                  }
                </> : <>Server people are typing...</>
            }
          </small> : null
      }
    </>
  );
};
