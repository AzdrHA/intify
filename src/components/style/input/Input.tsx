import React, {FC} from 'react';

export type InputProps = {
  id: string;
  placeholder?: string;
  label?: string;
  input: {};
  meta: {};
  required: boolean;
  extraClass?: string;
}
export const Input: FC<InputProps> = (props) => {
  return (
    <div className={'form-group ' +(props.extraClass??'')}>
      {
        props.label ?
          <label htmlFor={props.id}>{props.label} {props.required ? <span className={'required'}>*</span> : null}</label> :
          null
      }
      <input className={'input form-control'} required={props.required} id={props.id} type={props.id} {...props.input} placeholder={props.placeholder}/>
      {props.meta.error && props.meta.touched && <span className={'invalid-feedback'}>{props.meta.error}</span>}
    </div>
  );
};
