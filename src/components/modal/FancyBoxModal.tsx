import {Modal} from '@components/modal/Modal';
import React, {FC, useEffect} from 'react';
import {imageFormat} from '@app/utils/imageFormat';

type FancyBoxModalProps = {
  toggleModal: Function
  data: any
}
export const FancyBoxModal: FC<FancyBoxModalProps> = (props) => {
  const imageLoad: React.ChangeEventHandler<HTMLImageElement> = (e) => {
    imageFormat(e.currentTarget, window.innerWidth/1.5, window.innerHeight/1.5);
  };

  return (
    <Modal toggleModal={props.toggleModal}>
      <div className={'message-attachment-image-container transition-all'}>
        <img onLoad={imageLoad} src={props.data}/>
      </div>
    </Modal>
  );
};
