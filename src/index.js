import React from 'react';
import {AppRegistry} from 'react-native';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.web';
import * as serviceWorker from './serviceWorker';

const AppName = 'testa';
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

// AppRegistry.registerComponent(AppName, () => (
//   <Router>
//     <App />
//   </Router>
// ));

// AppRegistry.runApplication(AppName, {
//   rootTag: document.getElementById('root'),
// });

// If you want your app to work offline and load faster, you can change
serviceWorker.unregister();
