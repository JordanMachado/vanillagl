import raf from 'raf';
import matrix from 'gl-matrix';
import listener from 'mini-listener';
import * as Vanilla from './vanilla';

const glslify = require('glslify');

const gl = new Vanilla.GL();
const camera = new Vanilla.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.z = -30;

let time = 0;
const mesh = new Vanilla.Mesh(
  new Vanilla.BoxGeometry(),
  new Vanilla.Material({
    uniforms: {
      time: {
        type: 'uniform1f',
        value: 1,
      },
    },
  }),
);

const objects = [];
objects.push(mesh);


document.body.appendChild(gl.canvas);

draw();

listener.add('resize', () => {
  gl.resize();
  camera.aspect = window.innerWidth / window.innerHeight;
});

function draw() {
  raf(draw);
  time += 0.1;
  mesh.material.uniforms.time.value = time;
  mesh.rx += 0.05;
  mesh.rz += 0.02;

  gl.render(camera, objects);
}
