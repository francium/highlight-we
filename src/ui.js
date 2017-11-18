export default class UI {

  constructor(root) {
    this.root = root;
    this.box = undefined;
  }

  draw(x, y) {
    let callback = function(event) {
      console.log('button click');
    };

    const mountPoint = this.mountLocation();
    if (mountPoint) {
      this.drawBox(
        mountPoint.width / 2 + mountPoint.left - 96/2,
        mountPoint.top - 32,
        96,
        32
      );
    } else {
      this.hideBox();
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

  mountLocation() {
    let sel = document.getSelection();
    if (sel.toString()) {
      const selRange = sel.getRangeAt(0);
      const boundingBox = selRange.getBoundingClientRect();
      const topOffset = document.documentElement.scrollTop;
      return {
        left: boundingBox.left,
        top: boundingBox.top + topOffset,
        width: boundingBox.width,
        height: boundingBox.height
      };
    } else {
      return undefined;
    }
  }

  drawBox(x, y, w, h) {
    if (!this.box) {
      this.box = document.createElement('div');
      this.box.style.position = 'absolute';
      this.box.style.background = '#222';
      document.body.appendChild(this.box);
    }
    this.box.style.left = x + 'px';
    this.box.style.top = y + 'px';
    this.box.style.width = w + 'px';
    this.box.style.height = h + 'px';
  }

  hideBox() {
    if (this.box) {
      this.box.style.top = '-100px';
      this.box.style.left = '-100px';
    }
  }


}
