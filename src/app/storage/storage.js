/* global browser */

import Logger from '../util/logger';


export default class Storage {

  constructor(writeDelay) {
    this.logger = new Logger('storage');

    this._storage = browser.storage.local;
    this.logger.debug('Using storage:', this._storage);

    this._writeDelay = writeDelay;
    this._writeDebounceTimeoutId = undefined;
  }


  /**
   * Clear all data in local storage
   * @return {void}
   */
  clear() {
    this._storage.clear();
  }


  /**
   * Set a value
   * @param {any} key
   * @param {any} value
   * @return {promise}
   */
  set(key, value) {
    const obj = {};
    obj[key] = value;
    return this._storage.set(obj);

    // this._clearLastTimeout();
    // this._setTimeout(() => this._set(key, value), this._writeDelay);
  }


  /**
   * Retrieve a value
   * @param  {any} key
   * @return {promise<any>} promise of the value
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this._storage.get(key)
        .then((value) => {
          resolve(value[key]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  // _set(key, value) {
  //
  // }


  // _clearLastTimeout() {
  //   if (this._writeDebounceTimeoutId) {
  //     clearTimeout(this._writeDebounceTimeoutId);
  //   }
  // }


  // _setTimeout(callback, delay) {
  //   this._write_debounce_timeout_id = setTimeout(() => callback(), delay);
  // }

}
