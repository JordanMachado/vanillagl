import listener from 'mini-listener';

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
export default class OrbitControl {
  constructor(target) {
    this.target = target;
    listener.add('mouseup', this.mouseup.bind(this));
    listener.add('mousemove', this.mousemove.bind(this));
    listener.add('mousedown', this.mousedown.bind(this));
    this.dragging = false;
    this.radius = 50;
    this.start = {
      x: 0,
      y: 0,
    };
    this.distance = {
      x: 0,
      y: 0,
    };
    this.position = [0, 0, 0];
    this.rx = 0;
    this.ry = 0;
    this.prevRx = 0;
    this.prevRy = 0;

  }
  mousedown(e) {
    this.dragging = true;
    this.start = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
    this.prevRx = this.rx;
    this.prevRy = this.ry;
  }
  mouseup() {
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
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
    this.distance.x = current.x - this.start.x;
    this.distance.y = current.y - this.start.y;
    this.rx = -(this.prevRx - this.distance.y) * 5;
    this.ry = (this.prevRy - this.distance.x) * 5;
    this.rx = clamp(this.rx, -Math.PI / 2, Math.PI / 2);

  }
  update() {
    this.position[1] = Math.sin(this.rx) * this.radius;
    const r = this.radius * Math.cos(this.rx);
    this.position[0] = Math.sin(this.ry) * r;
    this.position[2] = Math.cos(this.ry) * r;
    this.target.lookAt(this.position, [0, 0, 0]);
  }
}
