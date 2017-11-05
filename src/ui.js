export default class UI {

  constructor(root) {
    this.root = root;
    this.uiNode = undefined;
  }

  draw(x, y) {
    this.clearUI();

    this.uiNode = document.createElement('div');
    this.uiNode.setAttribute('id', 'ccFranciumHighlight');

    const nodeContent = document.createTextNode('Hello, World!');

    let callback = function(event) {
      console.log('button click');
    };

    const but = this.button(callback, this.uiNode, [
      ['background', 'white'],
      ['color', 'gray']
    ]);
    this.uiNode.appendChild(but);

    this.uiNode.appendChild(nodeContent);
    this.root.appendChild(this.uiNode);

    this.uiNode.style.position = 'absolute';
    this.uiNode.style.zIndex = 999;
    this.uiNode.style.background = '#999';
    this.uiNode.style.borderRadius = '5px';
    this.uiNode.style.color = 'black';

    const w = this.uiNode.offsetWidth;
    const h = this.uiNode.offsetHeight;

    this.uiNode.style.left = `${x - w/2}px`;
    this.uiNode.style.top = `${y}px`;
  }

  clearUI() {
    if (this.uiNode) {
      this.uiNode.remove();
    }
  }

  button(callback, root, props) {
    let but = document.createElement('button');

    if (callback) {
      but.onclick = callback;
    }

    for (let prop of props) {
      but.style[prop.name] = prop.value;
    }

    root.appendChild(but);
    return but;
  }

}
