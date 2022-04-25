import {Field, Form} from 'react-final-form';
import React from 'react';
import {GuildChannelCreateRequest} from '@app/type/Api/GuildRequest';

export const GuildChannelCreateForm = () => {
  const submitForm = (data: GuildChannelCreateRequest) => {
  };

  return (
    <Form
      onSubmit={submitForm}
      validate={() => {
        const errors: Partial<GuildChannelCreateRequest> = {};
        return errors;
      }}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Field name={'type'} render={({input}) => (
            <div>
              <label htmlFor="type">type</label>
              <input required id={'type'} type={'type'} {...input} placeholder="type"/>
            </div>
          )}/>

          <Field name={'name'} render={({input}) => (
            <div>
              <label htmlFor="name">name</label>
              <input required id={'name'} type={'name'} {...input} placeholder="name"/>
            </div>
          )}/>

          <button type="submit">Create</button>
        </form>
      )}
    />
  );
};
