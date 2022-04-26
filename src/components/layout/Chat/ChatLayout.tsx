import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import {generatePath, useParams} from 'react-router';
import {ChatDefaultMessageLayout} from '@components/layout/Chat/ChatDefaultMessageLayout';
import {UtilsStr} from '@app/utils/UtilsStr';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {ChatProps} from '@app/type/Props/ChatProps';
import {DivContentEditable} from '@components/style/input/DivContentEditable';
import {Message} from '@app/type/Message/Message';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {ChatListLayout} from '@components/layout/Chat/ChatListLayout';
import {FileUploadButton} from '@components/style/button/FileUploadButton';
import {UserTypingState} from '@app/type/User/UserTypingState';
import {
  createMessageSubscription,
  startTypingMessageSubscription,
  stopTypingMessageSubscription,
} from '@app/mercure/subscription/messageSubscription';
import {ChatUserTyping} from '@components/partial/Chat/ChatUserTyping';
import {Divider} from '@components/style/divider';
import {objectToFormData} from '@app/utils/miscellaneous';
import {HeaderGuildChat} from '@components/guild/HeaderGuildChat/HeaderGuildChat';
import {startTypingMessagePublication, stopTypingMessagePublication} from '@app/mercure/publication/messagePublication';
import {useAppSelector} from '@app/reducers/hook';
import {imageFormat} from '@app/utils/imageFormat';
import {FancyBoxModal} from '@components/modal/FancyBoxModal';

export const ChatLayout: FC<ChatProps> = (props: ChatProps) => {
  const userInfo = useAppSelector((state) => state.user);
  const urlParams = useParams<GuildRouter>();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [writeTimeOut, setWriteTimeOut] = useState<any>();
  const [usersTyping, setUsersTyping] = useState<UserTypingState[]>([]);
  const [fancyBoxModalActive, setFancyBoxModalActive] = useState(null);

  const firstChannel = props.guild.channels.find((channel) => channel.id == urlParams.channel);

  const scroll = () => {
    if (scrollRef && scrollRef.current) scrollRef.current.scrollTop = (scrollRef.current.clientHeight * 18*540);
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  useEffect(() => {
    makeRequest(ApiConfig.messages(String(urlParams.channel)), 'GET').then((r) => {
      setMessages(r);
      scroll();
    });

    if (urlParams.channel) {
      createMessageSubscription(urlParams.channel, (e) => {
        setMessages((messages) => [...messages, JSON.parse(e.data)]);
        scroll();
      });

      startTypingMessageSubscription(urlParams.channel, (e) => {
        if (JSON.parse(e.data)['id'] !== userInfo.id) {
          setUsersTyping((user) => [...user, JSON.parse(e.data)]);
        }
        console.log('startTypingMessageSubscription', e);
      });

      stopTypingMessageSubscription(urlParams.channel, (e) => {
        console.log('stopTypingMessageSubscription', e);
        /* const array = [...usersTyping]; // make a separate copy of the array
        array.splice(2, 1);*/
        setUsersTyping([]);
      });
    }
  }, [urlParams.channel]);

  const imageLoad: React.ChangeEventHandler<HTMLImageElement> = (e) => {
    imageFormat(e.currentTarget);
  };

  const fileOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const sendMessage = (message: string) => {
    makeRequest(ApiConfig.messages(String(urlParams.channel)), 'POST', objectToFormData({
      content: message,
      file: file,
    }), true, true);
    setFile(null);
  };

  const keyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    const value = e.currentTarget.innerText.trimStart().trim();

    clearTimeout(writeTimeOut);
    if (!writeTimeOut) {
      console.log('start typing');

      if (urlParams.channel) {
        startTypingMessagePublication(urlParams.channel, {'id': userInfo.id, 'name': userInfo.username}).then((r) => {
        });
      }
    }

    setWriteTimeOut(setTimeout(() => {
      console.log('stop typing');
      if (urlParams.channel) {
        stopTypingMessagePublication(urlParams.channel, {'id': userInfo.id, 'name': userInfo.username}).then((r) => {
        });
      }
      setWriteTimeOut(null);
    }, 2000));

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.length === 0) return;
      sendMessage(value);
      e.currentTarget.innerHTML = '';
    }
  };

  return (
    firstChannel ? <>
      <div className="chat-header-container overflow-hidden h-12 text-white">
        <HeaderGuildChat {...firstChannel}/>
      </div>
      <div className={'section-chat-messages text-white'} ref={scrollRef}>
        <div className={'section-chat-channel-info-container'}>
          <>
            <ChatDefaultMessageLayout channel={firstChannel}/>
          </>
          <>
            {
              fancyBoxModalActive ? <FancyBoxModal data={fancyBoxModalActive} toggleModal={setFancyBoxModalActive}/> : null
            }
            <ChatListLayout messages={messages} imageClick={setFancyBoxModalActive}/>
          </>
        </div>
      </div>
      {
        file ? <div className={'input-message-container px-4'}>
          <div className={'container-message-attachment rounded-t-lg'}>
            <div>
              <img onLoad={imageLoad} src={URL.createObjectURL(file)} alt=""/>
            </div>
          </div>
          <Divider extraClass={'h-px'}/>
        </div> : null
      }

      <div className={usersTyping.length ? 'input-message-container px-4' : 'input-message-container px-4 pb-4'}>
        <div className={file ? 'input-message-content rounded-b-lg' : 'input-message-content rounded-b-lg rounded-t-lg'}>
          <FileUploadButton onChange={fileOnChange} accept={'image/*'}/>
          <DivContentEditable onKeyDown={keyDown}
            placeholder={`Message #${UtilsStr.formatToChannelName(firstChannel.name)}`}/>
        </div>
        <ChatUserTyping usersTyping={usersTyping}/>
      </div>
    </> : null
  );
};
