/* global document */

/**
 * Get bounding rect of a selection on the document.
 * Adjustment made for document scroll position from top.
 * @param  {Selection} selection
 * @return {{left: number, top: number, width: number, height: number}}
 */
export function selectionBox(selection) {
  const topOffset = document.documentElement.scrollTop;
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
