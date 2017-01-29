let index = 0;

export default class Texture {
  constructor(image) {
    index++;
    if (!image) {
      image = document.createElement('canvas');
      image.width = 1;
      image.height = 1;
    }

    this.texture = gl.createTexture();
    this.texture.image = image;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture.image = image;
    this.index = index;
    // gl.activeTexture(gl.TEXTURE0 + index);

  }
  bind(tindex = 0) {
    gl.activeTexture(gl.TEXTURE0 + tindex);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }
}
