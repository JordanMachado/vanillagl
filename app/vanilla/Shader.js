const glslify = require('glslify');

export default class Shader {
  constructor(strVs = glslify('./shaders/basic.vert'), strFs = glslify('./shaders/basic.frag')) {

    this.vs = this.createShader(strVs, true);
    this.fs = this.createShader(strFs, false);
    this.program = this.createProgram(this.vs, this.fs);
  }

  createShader(source, isShaderVextex) {
    const type = isShaderVextex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  createProgram(vs, fs) {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  uniform(name, type, value) {

    this.program[name] = gl.getUniformLocation(this.program, name);

    if (type.indexOf('Matrix') === -1) {
      gl[type](this.program[name], value);
    } else {
      gl[type](this.program[name], gl.FALSE, value);
    }

  }
}
