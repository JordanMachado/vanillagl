import raf from 'raf';
import matrix from 'gl-matrix';
import listener from 'mini-listener';
import * as Vanilla from './vanilla';

const glslify = require('glslify');

const gl = new Vanilla.GL();
const camera = new Vanilla.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.z = -30;

const material = new Vanilla.Material();
const geom = new Vanilla.BoxGeometry();
const mesh = new Vanilla.Mesh(geom, material);

document.body.appendChild(gl.canvas);

draw();

listener.add('resize', () => {
  gl.resize();
  camera.aspect = window.innerWidth / window.innerHeight;
});

function draw() {
  raf(draw);
  mesh.rx += 0.05;
  mesh.rz += 0.02;
  gl.render(camera, mesh);
}
