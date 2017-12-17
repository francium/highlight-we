import React from 'react';

import Logger from '../util/logger';


export default class BaseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.logger = new Logger(`highlight-we::${this.constructor.name}`);
  }

}
