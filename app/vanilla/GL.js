import glm from 'gl-matrix';
import State from './State';

export default class GL {
  constructor({
    canvas = null,
    width = window.innerWidth,
    height = window.innerWidth,
    contextOptions = {},
  } = {}) {

    this.canvas = this.canvas ? canvas : document.createElement('canvas');
    try {
      window.gl = this.gl = this.canvas.getContext('webgl', contextOptions) || this.canvas.getContext('experimental-webgl', contextOptions);
    } catch (e) {
      console.warn('Webgl not supported');
    }

    this.gl.clearColor(0, 0, 0, 1);
    this.resize(width, height);

    this.normalMatrix = glm.mat4.create();
    this.currentMesh = null;
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
  }
  render(camera, scene) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    for (let i = 0; i < scene.children.length; i += 1) {
      this.currentMesh = scene.children[i];
      if (this.currentMesh.material.depthTest) {
        State.enable(gl.DEPTH_TEST);
      } else {
        State.disable(gl.DEPTH_TEST);
      }
      this.useShader(this.currentMesh.material.shader);
      this.computeNormalMatrix();
      this.setDefaultUniforms(camera);
      if (this.currentMesh.material.uniforms) {
        this.setUniforms();
      }

      this.bindBuffer(this.currentMesh);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.currentMesh.geometry.indices.buffer);
      switch (this.currentMesh.material.drawType) {
        case 'triangles':
          gl.drawElements(gl.TRIANGLES, this.currentMesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
          break;
        case 'lines':
          gl.drawElements(gl.LINES, this.currentMesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
          break;
        case 'points':
          gl.drawElements(gl.POINTS, this.currentMesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
          break;
        default:

      }


    }

  }
  computeNormalMatrix() {
    glm.mat4.identity(this.normalMatrix);
    glm.mat4.transpose(this.normalMatrix, this.normalMatrix);
    glm.mat4.invert(this.normalMatrix, this.currentMesh.matrix);
  }
  setDefaultUniforms(camera) {
    this.shader.uniform('worldMatrix', 'uniformMatrix4fv', this.currentMesh.matrixWorld);
    this.shader.uniform('normalMatrix', 'uniformMatrix4fv', this.normalMatrix);
    this.shader.uniform('viewMatrix', 'uniformMatrix4fv', camera.matrix);
    this.shader.uniform('projectionMatrix', 'uniformMatrix4fv', camera.projection);
  }
  setUniforms() {
    if (this.currentMesh.material.uniforms) {
      const uniforms = this.currentMesh.material.uniforms;
      //  console.log(mesh.material.uniforms);
      for (const key in uniforms) {
        const _uniform = uniforms[key];
        if (_uniform.type === 'uniform1i') {
          // console.log(_uniform.value.bind);
          this.shader.uniform(key, _uniform.type, _uniform.value.index);
          _uniform.value.bind(_uniform.value.index);

        } else {
          this.shader.uniform(key, _uniform.type, _uniform.value);
        }
      }
    }
  }
  useShader(shader) {
    if (this.shader === shader) return;
    this.shader = shader;
    this.gl.useProgram(shader.program);
  }
  bindBuffer(mesh) {
    for (const key in mesh.geometry.attributes) {
      const attribute = mesh.geometry.attributes[key];
      gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
      const attrPosition = this.getAttribLoc(this.shader.program, attribute.name);
      gl.vertexAttribPointer(attrPosition, attribute.itemSize, gl.FLOAT, false, 0, 0);
      State.enableAttribute(attrPosition);
    }
  }
  getAttribLoc(program, name) {
    return gl.getAttribLocation(program, name);
  }
}
