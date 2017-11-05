import TextHighlighter from 'text-highlighter';
import UI from './ui';


class App {
  constructor() {
    this.root = document.body;

    const thl = new TextHighlighter(this.root);

    this.ui = new UI(this.root);

    this.root.onmousedown = (event) => {
    };

    document.onkeypress = (event) => {
      if (event.key === "m") {
        thl.doHighlight();
      }
    };
  }
}


function main() {
  const app = new App();
}


main();
