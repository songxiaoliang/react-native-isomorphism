import React from 'react';
import ReactDOM from 'react-dom';
import App from '../web-build/App.web';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
serviceWorker.unregister();
