import glm from 'gl-matrix';
import Object3D from '../Object3D';

export default class Camera extends Object3D {
  constructor() {
    super();
    this.projection = glm.mat4.create();
    glm.mat4.identity(this.projection);

  }
}
