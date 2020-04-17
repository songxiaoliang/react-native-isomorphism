import React from 'react';
import {AppRegistry} from 'react-native';
import ReactDOM from 'react-dom';
import App from './App.web';
import * as serviceWorker from './serviceWorker';

const AppName = 'testa';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

AppRegistry.registerComponent(AppName, () => App);

AppRegistry.runApplication(AppName, {
  rootTag: document.getElementById('root'),
});

// If you want your app to work offline and load faster, you can change
serviceWorker.unregister();
