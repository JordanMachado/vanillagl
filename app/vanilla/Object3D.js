import glm from 'gl-matrix';
// TODO need to find how to update the matrix of parents without calling update matrix for each position etc...
export default class Object3D {
  constructor() {

    this._needUpdate = true;

    this._x = 0;
    this._y = 0;
    this._z = 0;

    this._rx = 0;
    this._ry = 0;
    this._rz = 0;

    this._sx = 1;
    this._sy = 1;
    this._sz = 1;

    this._position = glm.vec3.create();
    this._rotation = glm.vec3.create();
    this._scale = glm.vec3.fromValues(1, 1, 1);

    this._matrix = glm.mat4.create();
    this._matrixWorld = glm.mat4.create();
    this._matrixRotation = glm.mat4.create();
    this._matrixScale = glm.mat4.create();
    this._matrixTranslation = glm.mat4.create();

    this.parent = null;
    this.children = [];
  }
  _updateMatrix() {
    glm.vec3.set(this._scale, this._sx, this._sy, this._sz);
    glm.vec3.set(this._rotation, this._rx, this._ry, this._rz);
    glm.vec3.set(this._position, this._x, this._y, this._z);

    glm.mat4.identity(this._matrixTranslation, this._matrixTranslation);
    glm.mat4.identity(this._matrixScale, this._matrixScale);
    glm.mat4.identity(this._matrixRotation, this._matrixRotation);

    glm.mat4.rotateX(this._matrixRotation, this._matrixRotation, this._rx);
    glm.mat4.rotateY(this._matrixRotation, this._matrixRotation, this._ry);
    glm.mat4.rotateZ(this._matrixRotation, this._matrixRotation, this._rz);

    glm.mat4.scale(this._matrixScale, this._matrixScale, this._scale);
    glm.mat4.translate(this._matrixTranslation, this._matrixTranslation, this._position);

    glm.mat4.mul(this._matrix, this._matrixTranslation, this._matrixRotation);
    glm.mat4.mul(this._matrix, this._matrix, this._matrixScale);

    this._updateMatrixWorld();

    this._needUpdate = false;


  }
  _updateMatrixWorld() {

    if (this.parent) {
      glm.mat4.multiply(this._matrixWorld, this.parent.matrixWorld, this._matrix);
    } else {
      glm.mat4.copy(this._matrixWorld, this._matrix);
    }

    for (let i = 0, l = this.children.length; i < l; i += 1) {
      this.children[i]._updateMatrixWorld();
    }
  }
  set x(value) {
    this._needUpdate = true;
    this._x = value;
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._needUpdate = true;
    this._y = value;
  }
  get y() {
    return this._y;
  }
  set z(value) {
    this._needUpdate = true;
    this._z = value;
  }
  get z() {
    return this._z;
  }
  set position(value) {
    this._needUpdate = true;
    this._position = value;
  }
  get position() {
    return this._position;
  }
  set rx(value) {
    this._needUpdate = true;
    this._rx = value;
  }
  get rx() {
    return this._rx;
  }
  set ry(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();

    this._ry = value;
  }
  get ry() {
    return this._ry;
  }
  set rz(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();
    this._rz = value;
  }
  get rz() {
    return this._rz;
  }
  set rotation(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();
    this._rotation = value;
  }
  get rotation() {
    return this._rotation;
  }
  set sx(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();
    this._sx = value;
  }
  get sx() {
    return this._sx;
  }
  set sy(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();
    this._sy = value;
  }
  get sy() {
    return this._sy;
  }
  set sz(value) {
    this._needUpdate = true;
    if (this._needUpdate) this._updateMatrix();
    this._sz = value;
  }
  get sz() {
    return this._sz;
  }
  set scale(value) {
    this._needUpdate = true;
    this._sx = value[0];
    this._sy = value[1];
    this._sz = value[2];
    this._scale = value;
    if (this._needUpdate) this._updateMatrix();
  }
  get scale() {
    return this._scale;
  }

  get matrix() {
    if (this._needUpdate) this._updateMatrix();
    return this._matrix;
  }
  get matrixWorld() {
    return this._matrixWorld;
  }
  add(object) {
    // todo check if he has already a parent
    object.parent = this;
    this.children.push(object);
  }
}
