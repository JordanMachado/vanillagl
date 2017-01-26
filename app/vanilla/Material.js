import Shader from './Shader';
const glslify = require('glslify');

export default class Material {
  constructor({
    fog = false,
    lights = false,
    depthTest = true,
    uniforms = null,
    drawType = 'triangles',
    side = 'double',
    vertexShader = glslify('./shaders/basic.vert'),
    fragmentShader = glslify('./shaders/basic.frag'),
  } = {}) {
    this.depthTest = depthTest;
    this.drawType = drawType;
    this.side = side;
    this.defines = [];
    this.uniforms = uniforms;
    this.shader = new Shader(vertexShader, fragmentShader, this);

    for (const key in this.uniforms) {
      const item = this.uniforms[key];
      console.log(item);
    }
  }
}
