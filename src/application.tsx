import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {store} from '@app/reducers/store';
import {Provider} from 'react-redux';
import {BaseRouter} from '@app/router/BaseRouter';
import './assets/styles/app.scss';
import './assets/styles/index.css';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <BaseRouter/>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

