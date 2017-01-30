import listener from 'mini-listener';
import raf from 'raf';
import * as Vanilla from '../../app/vanilla';

console.log('This is an example.');
console.log('Source code: https://github.com/JordanMachado/vanillagl/blob/master/examples/src/cube.js');
const glslify = require('glslify');

const loader = new Vanilla.Loader();
loader.load('../assets/brick.jpg', () => {
  mesh.material.uniforms.map.value = loader.textures.brick;
});

const gl = new Vanilla.GL();
const scene = new Vanilla.Scene();
const camera = new Vanilla.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new Vanilla.OrbitControl(camera);

const mesh = new Vanilla.Mesh(
  new Vanilla.BoxGeometry(2, 2, 2),
  new Vanilla.Material({
    uniforms: {
      time: {
        type: 'uniform1f',
        value: 1,
      },
      map: {
        type: 'uniform1i',
        value: new Vanilla.Texture(),
      },
    },
  }),
);

scene.add(mesh);

let time = 0;
draw();

function draw() {
  raf(draw);
  time += 0.1;
  mesh.material.uniforms.time.value = time;
  mesh.ry += 0.02;
  mesh.rz += 0.02;
  controls.update();

  gl.render(camera, scene);
}

listener.add('resize', () => {
  gl.resize();
  camera.aspect = window.innerWidth / window.innerHeight;
});

document.body.appendChild(gl.canvas);
