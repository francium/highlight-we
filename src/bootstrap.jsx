/* global document */

import ReactDOM from 'react-dom';
import React from 'react';  // Needed for eslint ('render(<App/>...)'')
import Logger from './app/util/logger';

import App from './app/app/app';


export default function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.debug('Bootstraping App');
  const root = document.createElement('div');
  root.id = 'highligh-we';
  document.body.appendChild(root);
  ReactDOM.render(<App />, document.getElementById('highligh-we'));
  logger.debug('Bootstrap of App complete');
}
