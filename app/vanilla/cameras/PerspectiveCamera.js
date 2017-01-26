import glm from 'gl-matrix';
import Camera from './Camera';

export default class PerspectiveCamera extends Camera {
  constructor(fieldOfViewDegree, aspect, zNear, zFar) {
    super();
    this.fieldOfView = fieldOfViewDegree;
    this._apsect = aspect;
    this.zNear = zNear;
    this.zFar = zFar;

    this.projection = glm.mat4.perspective(this.projection,
      glm.glMatrix.toRadian(fieldOfViewDegree),
      aspect,
      zNear,
      zFar,
    );
  }
  lookAt(aEye, aCenter, aUp = [0, 1, 0]) {
    glm.vec3.copy(this.position, aEye);
    glm.mat4.identity(this.matrix);
    glm.mat4.lookAt(this.matrix, aEye, aCenter, aUp);
  }
  updateProjectionMatrix() {
    this.projection = glm.mat4.perspective(this.projection,
      glm.glMatrix.toRadian(this.fieldOfView),
      this._apsect,
      this.zNear,
      this.zFar,
    );
  }
  get aspect() {
    return this._apsect;
  }
  set aspect(value) {
    this._apsect = value;
    this.updateProjectionMatrix();
  }
}
