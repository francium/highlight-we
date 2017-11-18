import { default as debounce } from 'debounce';
import Highlighter from 'highlight-page';
import UI from './ui';


class App {

  constructor() {
    // Constants
    this.UI_DELAY = 1000;

    this.root = document.body;

    const thl = new Highlighter(this.root);

    this.ui = new UI(this.root);

    document.addEventListener('selectionchange', debounce(() => {
      console.log('selection change', new Date());
      this.ui.draw();
    }, this.UI_DELAY));

    document.addEventListener('keydown', event => {
      if (event.key === "m") {
        thl.doHighlight();
      }
    });
  }

}


function main() {
  const app = new App();
}


main();
