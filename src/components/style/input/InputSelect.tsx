import React, {FC} from 'react';
import {FieldMetaState} from 'react-final-form';

export type InputSelectProps = {
  id: string;
  placeholder?: string;
  label?: string;
  input: {};
  meta: FieldMetaState<any>;
  required: boolean;
  extraClass?: string;
  children?: React.ReactNode;
}

export const InputSelect: FC<InputSelectProps> = (props: InputSelectProps) => {
  return (
    <div className={'form-group ' +(props.extraClass??'')}>
      {
        props.label ?
          <label htmlFor={props.id}>{props.label} {props.required ? <span className={'required'}>*</span> : null}</label> :
          null
      }
      <select className={'input form-control'} required={props.required} id={props.id} {...props.input}>
        {props.children}
      </select>
      {props.meta.error && props.meta.touched && <span className={'invalid-feedback'}>{props.meta.error}</span>}
    </div>
  );
};
