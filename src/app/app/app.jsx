/* global document */
/* global window */

import React from 'react';

import BaseComponent from '../base-component/base-component';
import Highlight from '../highlight/highlight';
import Popup from '../popup/popup';
import PopupActionEnum from '../popup/popup-action';
import PopupModeEnum from '../popup/popup-mode';
import * as util from '../util/util';
import Storage from '../storage/storage';
import config from '../config';


export default class App extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      selection: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      popupHidden: true,
      activeHighlight: undefined,
      popupMode: undefined,
    };

    this.storage = new Storage(config.write_delay);
    this.highlighter = new Highlight(document.body);
    this.registerListeners();
  }


  async loadHighlights() {
    try {
      const data = await this.storage.get(config.storage_highlight_data_key);
      if (data) {
        this.logger.debug('Applying serialized data:', data);
        this.highlighter.deserialize(data);
      } else {
        this.logger.debug('No serialized data in storage');
      }
    } catch (error) {
      this.logger.error('Unable to load serailized data:', error);
    }
  }


  componentDidMount() {
    this.onSelectionChange(document.getSelection());
    this.loadHighlights();
  }


  componentWillUnmount() {
    // TODO: is this being removed correctly? Does the binding affect it because
    // it would create a new function rather than this one. See the mozilla
    // docs, they have an example of addEventListener(__type__, this, false);
    // document.removeEventListener(this.selectionChangeListener);
    // this.selectionChangeListener = undefined;
  }


  registerListeners() {
    document.addEventListener(
      'selectionchange',
      event => this.onSelectionChange(document.getSelection()),
    );

    document.body.addEventListener(
      'click',
      event => this.onDocumentBodyClick(event),
    );

    window.addEventListener(
      'beforeunload',
      event => this.onDoucmentUnload(event),
    );
  }


  onDocumentBodyClick(event) {
    if (event.target.getAttribute('data-highlighted') === 'true') {
      const selectionBox = util.clientRect(event.target);
      this.setState({
        selectionBox: {
          width: selectionBox.width,
          height: selectionBox.height,
          top: selectionBox.top,
          left: selectionBox.left,
        },
        popupMode: PopupModeEnum.EditHighlight,
        activeHighlight: event.target,
      });

      this.setState({ popupHidden: false });
    }
  }


  onSelectionChange(selection) {
    const popupHidden = !selection.toString();

    if (!popupHidden) {
      const selectionBox = util.selectionBox(selection);
      this.setState({
        selectionBox: {
          width: selectionBox.width,
          height: selectionBox.height,
          top: selectionBox.top,
          left: selectionBox.left,
        },
        popupMode: PopupModeEnum.NewSelection,
      });
    }

    this.setState({ popupHidden });
  }


  onDoucmentUnload() {
    // TODO
    // If have dirty changes, then save to local storage
    // this.storage.flush();
  }


  onPopupAction(action) {
    switch (action) {
      case PopupActionEnum.DoHighlight:
        this.highlighter.doHighlight();
        this.storage.set(config.storage_highlight_data_key, this.highlighter.serialize())
          .then(result => this.logger.debug('Saved data to storage', result))
          .catch(error => this.logger.error('Error saving data to storage', error));
        break;

      case PopupActionEnum.DoNote:
        break;

      case PopupActionEnum.DoRemove:
        this.logger.debug('Removing highlight:', this.state.activeHighlight);
        this.highlighter.removeHighlight(this.state.activeHighlight);
        this.setState({ activeHighlight: undefined });
        break;

      default:
        this.logger.warn('Unknown PopupActionEnum:', action);
    }
  }


  viewPopup() {
    return this.state.popupHidden ? false : (
      <Popup
        popupMode={this.state.popupMode}
        selectionBox={this.state.selectionBox}
        actionHandler={action => this.onPopupAction(action)}
      />
    );
  }


  render() {
    return this.viewPopup();
  }

}
