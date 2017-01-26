import Object3D from './Object3D';

export default class Mesh extends Object3D {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }
}
