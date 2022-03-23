import React, {FC} from 'react';
import {ServerButton} from '@components/ServerButton/ServerButton';
import {Guild} from '@app/Type/Guild';
import {Divider} from '@components/Divider';

type ServerSideProps = {
  guilds: Guild[]
}

export const ServerSide: FC<ServerSideProps> = (props: ServerSideProps) => {
  return (
    <div className="w-14 h-full max-h-screen bg-dark-100 overflow-y-auto">
      <div className="py-1.5">
        <ServerButton name={'Home'} type={'HOME'}/>

        {
          props.guilds.length ? <Divider/> : null
        }

        {
          props.guilds.map((guild, i) => {
            return (
              <ServerButton {...guild} type={'SERVER'} key={i}/>
            );
          })
        }

        <Divider/>

        <ServerButton name={'Add server'} type={'ADD'}/>
      </div>
    </div>
  );
};
