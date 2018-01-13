/* global browser, document */

/**
 * Get bounding rect of a selection on the document.
 * Adjustment made for document scroll position from top.
 * @param  {Selection} selection
 * @return {{left: number, top: number, width: number, height: number}}
 */
export function selectionBox(selection) {
  const topOffset = window.scrollY;
  const selectionRange = selection.getRangeAt(0);
  const boundingBox = selectionRange.getBoundingClientRect();
  // eslint-disable-next-line no-use-before-define
  return adjustedBox(boundingBox, topOffset);
}


/**
 * Get bounding rect of an element on the document.
 * Adjustment made for document scroll position from top.
 * @param  {Element} element
 * @return {{left: number, top: number, width: number, height: number}}
 */
export function clientRect(element) {
  const topOffset = document.documentElement.scrollTop;
  const boundingBox = element.getBoundingClientRect();
  // eslint-disable-next-line no-use-before-define
  return adjustedBox(boundingBox, topOffset);
}


function adjustedBox(boundingBox, topOffset) {
  return {
    left: boundingBox.left,
    top: boundingBox.top + topOffset,
    width: boundingBox.width,
    height: boundingBox.height,
  };
}


export function setIcon(tabId, enabled) {
  this.logger.debug('Setting browser action icon:',
    enabled ? '../icons/icon-32.png' : '../icons/icon-gray-32.png');

  // relative to /static directory
  browser.browserAction.setIcon({
    path: enabled ? '../icons/icon-32.png' : '../icons/icon-gray-32.png',
    tabId,
  });

}


/**
 * Only usable from content script
 */
export async function getCurrentTab() {
  return browser.tabs.getCurrent();
}
