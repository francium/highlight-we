/* global browser */

import React from 'react';

import BaseComponent from '../../common/base-component/base-component';
import Storage from '../../common/storage/storage';
import config from '../../common/config';


export default class App extends BaseComponent {

  constructor(props) {
    super(props);

    this.storage = new Storage(config.write_delay);

    this.state = {
      highlightingEnabled: false,
      activeTab: undefined,
    };

    this.getCurrentTab();
  }

  async getCurrentTab() {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    this.setState({ activeTab: tabs[0].id });
  }

  async onToggleHighlighting() {
    if (!this.state.activeTab) {
      this.logger.warn('Active tab not set. Not sending message to toggle highlighting');
      return;
    }
    try {
      const response = await browser.tabs.sendMessage(
        this.state.activeTab,
        { message: 'highlightingToggle' },
      );

      this.setState({ highlightingEnabled: response.response });
    } catch (error) {
      this.logger.debug('Error sending message', error);
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.onToggleHighlighting()}>
          {this.state.highlightingEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  }

}