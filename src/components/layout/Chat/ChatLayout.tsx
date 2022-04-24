import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import {HeaderGuildChat} from '@components/Guild/HeaderGuildChat/HeaderGuildChat';
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
import axios from 'axios';
import {mercureConfig} from '@app/mercure/MercureConfig';
import {objectToFormData} from '@app/utils/miscellaneous';

export const ChatLayout: FC<ChatProps> = (props: ChatProps) => {
  const urlParams = useParams<GuildRouter>();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [writeTimeOut, setWriteTimeOut] = useState<any>();
  const [usersTyping, setUsersTyping] = useState<UserTypingState[]>([]);

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
  }, [urlParams.channel]);

  useEffect(() => {
    if (urlParams.channel) {
      createMessageSubscription(urlParams.channel, (e) => {
        setMessages((messages) => [...messages, JSON.parse(e.data)]);
        scroll();
      });

      startTypingMessageSubscription(urlParams.channel, (e) => {
        setUsersTyping((user) => [...user, JSON.parse(e.data)]);
        console.log([...usersTyping, JSON.parse(e.data)]);
        console.log('startTypingMessageSubscription', e);
      });

      stopTypingMessageSubscription(urlParams.channel, (e) => {
        console.log('stopTypingMessageSubscription', e);
        const array = [...usersTyping]; // make a separate copy of the array
        array.splice(2, 1);
        setUsersTyping(array);
      });
    }
  }, []);

  const fileOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const sendMessage = (message: string) => {
    /* makeRequest(ApiConfig.messages(String(urlParams.channel)), 'POST', {
      content: message,
    });*/
    makeRequest(ApiConfig.messages(String(urlParams.channel)), 'POST', objectToFormData({
      content: message,
      file: file,
    }), true, true);
    setFile(null);
  };

  const keyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    const value = e.currentTarget.innerText.trimStart().trim();

    clearTimeout(writeTimeOut);
    if (!writeTimeOut) console.log('start typing');

    /* axios.request({
      method: 'POST',
      url: 'http://127.0.0.1:1080/.well-known/mercure',
      headers: {
        'authorization': 'Bearer '+mercureConfig.token.publication,
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        'topic': generatePath(mercureConfig.routes.channels.start_typing, {id: urlParams.channel}),
        'data': JSON.stringify({
          '@id': 'http://localhost:1080/.well-known/mercure/ui/demo/books/1.jsonld',
          'availability': 'https://schema.org/OutOfStock',
        }),
      },
    }).then((r) => {
      console.log(r);
    });*/

    setWriteTimeOut(setTimeout(() => {
      console.log('stop typing');
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
            <ChatListLayout messages={messages}/>
          </>
        </div>
      </div>
      {
        file ? <div className={'input-message-container px-4'}>
          <div className={'container-message-attachment rounded-t-lg'}>
            <img src={URL.createObjectURL(file)} alt=""/>
          </div>
          <Divider extraClass={'h-px'}/>
        </div> : null
      }

      <div className={usersTyping.length ? 'input-message-container px-4' : 'input-message-container px-4 pb-4'}>
        <div className={file ? 'input-message-content h-full rounded-b-lg' : 'input-message-content h-full rounded-b-lg rounded-t-lg'}>
          <FileUploadButton onChange={fileOnChange} accept={'image/*'}/>
          <DivContentEditable onKeyDown={keyDown}
            placeholder={`Message #${UtilsStr.formatToChannelName(firstChannel.name)}`}/>
        </div>
        <ChatUserTyping usersTyping={usersTyping}/>
      </div>
    </> : null
  );
};
