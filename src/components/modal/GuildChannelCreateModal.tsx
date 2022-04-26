import React, {FC} from 'react';
import {Modal} from '@components/modal/Modal';
import {GuildChannelCreateForm} from '@components/form/Guild/GuildChannelCreateForm';

export type GuildChannelCreateModalProps = {
  toggleModal: Function
  parent?: string | null;
}

export const GuildChannelCreateModal: FC<GuildChannelCreateModalProps> = (props ) => {
  return (
    <Modal toggleModal={props.toggleModal}>
      <GuildChannelCreateForm parent={props.parent} toggleModal={props.toggleModal}/>
    </Modal>
  );
};
