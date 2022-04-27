import {Modal, ModalProps} from '@components/modal/Modal';
import React, {FC, useState} from 'react';
import {GuildCreateForm} from '@components/form/Guild/GuildCreateForm';
import {GuildInviteJoinForm} from '@components/form/Guild/GuildInviteJoinForm';

export const ServerCreateModal: FC<Pick<ModalProps, 'toggleModal'>> = (props ) => {
  const [visibleJoinForm, setVisibleJoinForm] = useState(false);

  return (
    <Modal toggleModal={props.toggleModal}>
      {
        visibleJoinForm ? <GuildInviteJoinForm visibleJoinForm={setVisibleJoinForm} toggleModal={props.toggleModal}/> : <GuildCreateForm visibleJoinForm={setVisibleJoinForm} toggleModal={props.toggleModal}/>
      }
    </Modal>
  );
};
