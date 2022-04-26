import React, {FC} from 'react';

export type ModalProps = {
  extraClass?: string;
  children?: React.ReactNode;
  toggleModal: Function
}
export const Modal: FC<ModalProps> = (props: ModalProps) => {
  return (
    <div
      className={
        'full-height-mobile fixed left-0 top-0 z-50 w-screen ' +
        (props.extraClass??'')
      }>

      <div
        className={
          'w-full h-screen backgroundOverlay cursor-pointer flex justify-center items-center'
        }
        onClick={() => props.toggleModal()}
      />
      <div className={'modal-overlay absolute text-white'}>
        {props.children}
      </div>
    </div>
  );
};
