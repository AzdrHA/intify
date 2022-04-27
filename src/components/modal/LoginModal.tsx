import React, {FC} from 'react';
import {Modal} from '@components/modal/Modal';
import {GuildChannelCreateModalProps} from '@components/modal/GuildChannelCreateModal';
import {LoginForm} from '@components/form/Auth/LoginForm';

export const LoginModal: FC<GuildChannelCreateModalProps> = (props ) => {
  return (
    <Modal toggleModal={props.toggleModal}>
      <LoginForm/>
    </Modal>
  );
};
