import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../common/base-component/base-component';
import PopupActionEnum from './popup-action';
import PopupModeEnum from './popup-mode';

import styles from './popup.css';

import resSVGIconPencil from '../../../res/icon-pencil.svg';
import resSVGIconRemove from '../../../res/icon-remove.svg';


export default class Popup extends BaseComponent {

  constructor(props) {
    super(props);
    this.componentElement = undefined;
    this.state = {
      showColorSelector: false,
    };
  }


  onAction(action, maybeValue) {
    this.logger.debug('Popup action:', action);
    this.props.actionHandler(action, maybeValue);
  }


  onColorSelectClick() {
    this.setState({ showColorSelector: true });
  }


  onColorChange(event) {
    event.preventDefault();

    this.onAction(PopupActionEnum.DoColorChange, event.target.value);
    this.setState({ showColorSelector: false });
  }


  onPopupClick(event) {
    event.stopPropagation();
  }

  get popupStyle() {
    return {
      top: this.props.selectionBox.top,
      left: this.props.selectionBox.left + (this.props.selectionBox.width / 2),
    };
  }

  get colorSelectorStyle() {
    return {
      background: this.props.selectedColor,
    }
  }


  viewMode() {
    switch (this.props.popupMode) {
      case PopupModeEnum.NewSelection:
        /* eslint-disable react/no-danger */
        return (
          <div className={styles.actionButtonWrapper}>
            <button
              className={styles.actionButton}
              onClick={() => this.onAction(PopupActionEnum.DoHighlight)}
              dangerouslySetInnerHTML={{ __html: resSVGIconPencil }}
            />
            <select
              className={styles.colorSelector}
              style={this.colorSelectorStyle}
              onChange={event => this.onColorChange(event)}
              value={this.props.selectedColor}
            >
              <option value="rgb(255, 255, 123)">yellow</option>
              <option value="rgb(255, 180, 228)">pink</option>
              <option value="rgb(169, 255, 124)">green</option>
              <option value="rgb(124, 204, 255)">blue</option>
            </select>
          </div>
        );
        /* eslint-enable react/no-danger */

      case PopupModeEnum.EditHighlight:
        /* eslint-disable react/no-danger */
        return (
          <div className={styles.actionButtonWrapper}>
            <button
              className={styles.actionButton}
              onClick={() => this.onAction(PopupActionEnum.DoRemove)}
              dangerouslySetInnerHTML={{ __html: resSVGIconRemove }}
            />
          </div>
        );
        /* eslint-enable react/no-danger */

      default:
        this.logger.warn('Unknown view mode:', this.props.popupMode);
        return null;
    }
  }


  render() {
    return (
      <div
        className={styles.Popup}
        style={this.popupStyle}
        ref={(element) => { this.componentElement = element; }}
        onClick={event => this.onPopupClick(event)}
        role="presentation"
      >
        <div className={styles.popupContainer}>
          {this.viewMode()}
        </div>
      </div>
    );
  }

}


Popup.propTypes = {
  actionHandler: PropTypes.func,
  selectionBox: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  popupMode: PropTypes.string,  // enum
  selectedColor: PropTypes.string,
};

Popup.defaultProps = {
  actionHandler: () => {},
  selectionBox: {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  },
  popupMode: PopupModeEnum.NewSelection,
  selectedColor: 'yellow',
};
