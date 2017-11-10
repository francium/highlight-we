import Highlighter from 'highlight-page';
import UI from './ui';


class App {
  constructor() {
    this.root = document.body;

    const thl = new Highlighter(this.root);

    this.ui = new UI(this.root);

    document.addEventListener('keydown', (event) => {
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
