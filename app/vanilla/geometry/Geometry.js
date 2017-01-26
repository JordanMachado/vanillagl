export default class Geometry {
  constructor(vertices, indices, normals, uvs) {
    this.attributes = {};
    if (vertices) {
      this.addAttribute('position', vertices, 3);
    }
    if (indices) {
      this.addIndices(indices);
    }
    if (normals) {
      this.addAttribute('normal', normals, 3);
    }
    if (uvs) {
      this.addAttribute('uv', uvs, 2);
    }
  }
  addAttribute(name, data, size) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    this.attributes[name] = { name, itemSize: size, buffer };
    return this;
  }
  addIndices(data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    this.indices = {
      length: data.length,
      buffer,
    };
    return this;
  }
}
