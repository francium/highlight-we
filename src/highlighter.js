import TextHighlighter from 'text-highlighter';
import UI from './ui';


class App {
  constructor() {
    this.root = document.body;

    const thl = new TextHighlighter(this.root);

    this.ui = new UI(this.root);

    // document.onselectionchange = (event) => {
    //   document.body.style.border = "1px solid blue";
    //   setTimeout(() => document.body.style.border = "1px solid red", 500);
    //
    //   const selection = document.getSelection();
    //   if (selection) {
    //     this.ui.draw(selection.focusNode.clientx, selection.focusNode.clienty);
    //   } else {
    //     this.ui.clearUI();
    //   }
    // };
    //
    this.root.onmousedown = (event) => {
    };

    // bind to some key (M) and only then do highlight
    document.onkeypress = (event) => {
    // this.root.onmouseup = (event) => {
      if (event.key === "m") {
        thl.doHighlight();
        // document.body.style.border = "1px solid red";
        // const selection = window.getSelection();
        //
        // if (selection.toString()) {
        //   let rects = (selection.getRangeAt(0).getClientRects());
        //   let last = rects[rects.length - 1];
        //   console.log(last);
        //   this.ui.draw(last.x + last.width, last.y + last.height);
        }
    };
  }
}


function main() {
  const app = new App();
}


main();
