import css from './../styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Dummy from './Dummy';
import Time from './Time';

ReactDOM.render(
  <Time />,
  document.getElementById('time')
);

const renderApp = Component =>
ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('dummy')
);

renderApp(Dummy);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Dummy', () => {
    const NextApp = require('./Dummy').default;
    renderApp(NextApp);
  });
}