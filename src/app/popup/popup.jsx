import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../base-component/base-component';
import PopupActionEnum from './popup-action';
import PopupModeEnum from './popup-mode';

import styles from './popup.css';

import resSVGIconPencil from '../../../res/icon-pencil.svg';
import resSVGIconNote from '../../../res/icon-note.svg';
import resSVGIconRemove from '../../../res/icon-remove.svg';


export default class Popup extends BaseComponent {

  constructor(props) {
    super(props);
    this.componentElement = undefined;
  }


  onAction(action) {
    this.logger.debug('Popup action:', action);
    this.props.actionHandler(action);
  }


  get style() {
    const { top, left } = this.centeredPosition;
    return { top, left };
  }


  get centeredPosition() {
    if (this.componentElement) {
      const { height: thisHeight, width: thisWidth } =
        this.componentElement.getBoundingClientRect();
      // console.log(this.componentElement.getBoundingClientRect());
      return {
        top: this.props.selectionBox.top - thisHeight,
        left:
          this.props.selectionBox.left +
          (
            (this.props.selectionBox.width / 2) - (thisWidth / 2)
          ),
      };
    }

    return {
      top: this.props.selectionBox.top,
      left: this.props.selectionBox.left,
    };
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
            <button
              className={styles.actionButton}
              onClick={() => this.onAction(PopupActionEnum.DoNote)}
              dangerouslySetInnerHTML={{ __html: resSVGIconNote }}
            />
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
        style={this.style}
        ref={(element) => { this.componentElement = element; }}
      >
        {this.viewMode()}
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
};
