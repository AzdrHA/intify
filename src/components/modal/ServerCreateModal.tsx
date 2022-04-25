import {Modal, ModalProps} from '@components/modal/Modal';
import React, {FC} from 'react';
import {GuildCreateForm} from '@components/form/Guild/GuildCreateForm';

export const ServerCreateModal: FC<Pick<ModalProps, 'toggleModal'>> = (props ) => {
  return (
    <Modal toggleModal={props.toggleModal}>
      <GuildCreateForm toggleModal={props.toggleModal}/>
    </Modal>
  );
};
