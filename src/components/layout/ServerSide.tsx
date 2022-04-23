import React, {FC} from 'react';
import {ServerButton} from '@components/style/button/ServerButton';
import {Divider} from '@components/style/divider';
import {ServerSideProps} from '@app/type/Props/ServerSideProps';

export const ServerSide: FC<ServerSideProps> = (props: ServerSideProps) => {
  return (
    <div className="bg-dark-100 section-server-container">
      <div className="py-1.5">
        <ServerButton name={'Home'} type={'HOME'}/>

        {
          props.members ? <Divider/> : null
        }

        {
          props.members && props.members.map((guild, i) => {
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
