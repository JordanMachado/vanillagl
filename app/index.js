import raf from 'raf';
import matrix from 'gl-matrix';
import listener from 'mini-listener';
import * as Vanilla from './vanilla';

const glslify = require('glslify');


const loader = new Vanilla.Loader();
loader.load(['assets/brick.jpg', 'assets/normal.png'], () => {
  mesh.material.uniforms.map.value = loader.textures.brick;
});


const gl = new Vanilla.GL();
const scene = new Vanilla.Scene();
const camera = new Vanilla.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.z = -200;
const controls = new Vanilla.OrbitControl(camera);
let time = 0;
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
  // mesh2.material.uniforms.time.value = time;
  // scene.ry += 0.02;
  // mesh.rz += 0.02;
  // mesh2.rx -= 0.02;
  controls.update();

  gl.render(camera, scene);
}
