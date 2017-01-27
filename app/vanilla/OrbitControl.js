import listener from 'mini-listener';

export default class OrbitControl {
  constructor(target) {
    this.target = target;
    listener.add('mouseup', this.mouseup.bind(this));
    listener.add('mousemove', this.mousemove.bind(this));
    listener.add('mousedown', this.mousedown.bind(this));
    this.dragging = false;

    this.start = {
      x: 0,
      y: 0,
    };
    this.distance = {
      x: 0,
      y: 0,
    };
    this.position = [0,0,50];
    this.rx = 0;
    this.ry = 0;
    this._preRX = 0;
    this._preRY = 0;

  }
  mousedown(e) {
    console.log('down');
    this.dragging = true;
    this.start = {
      x: e.clientX,
      y: e.clientY,
    };
    this._preRX = this.rx;
		this._preRY = this.ry;
  }
  mouseup() {
    console.log('up');
    this.dragging = false;
    this.distance.x = 0;
    this.distance.y = 0;
    this.start = {
      x: 0,
      y: 0,
    };
  }

  mousemove(e) {
    if (!this.dragging) return;
    const current = {
      x: e.clientX,
      y: e.clientY,
    };
    this.distance.x = current.x - this.start.x;
    this.distance.y = current.y - this.start.y;
    this.rx = this._preRX - this.distance.y * 0.01;
    this.ry = this._preRY - this.distance.x * 0.01;
    console.log(this.distance.x, this.distance.y);


  }
  update() {
    this.position[0] =  Math.sin(this.ry) * 100;
    this.position[1] =  Math.cos(this.rx) * 100;
    // this.position.y =  Math.cos(this.ry) * -50;
    this.target.lookAt(this.position, [0,0,0]);
  }
}
