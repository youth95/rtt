import React from 'react';
import appConfig from '../index';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import Routers from './routers';
const App = appConfig.element;
ReactDOM.render(
  <App><Routers /></App>,
  appConfig.container,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (appConfig.isSupportPWA) {
  serviceWorker.unregister();
}
