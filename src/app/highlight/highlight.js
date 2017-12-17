import Highlighter from 'highlight-page';


export default class Highlight {

  constructor(root) {
    this.root = root;
    this.highlighter = new Highlighter(root);
  }


  /**
   * Highlight the selected element
   * @return {void}
   */
  doHighlight() {
    this.highlighter.doHighlight();
  }

  /**
   * Remove highlighting from an element
   * @param  {Element} element
   * @return {void}
   */
  removeHighlight(element) {
    this.highlighter.removeHighlights(element);
  }

  /**
   * Serialize highlight data
   * @return {any} Serialized data
   */
  serialize() {
    return this.highlighter.serializeHighlights();
  }

  /**
   * Deserialize data and apply highlight to elements on the root
   * @param  {any} data Serialized data
   * @return {void}
   */
  deserialize(data) {
    this.highlighter.deserializeHighlights(data);
  }

}
