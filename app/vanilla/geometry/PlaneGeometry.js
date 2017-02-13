import Geometry from './Geometry';

export default class PlaneGeometry extends Geometry {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {

    const halfWidth = width / 2;
    const halfHeight = height / 2;


    const vertices = [
      -0.5, 0.5, 0.0,
      -0.5, -0.5, 0.0,
      0.5, -0.5, 0.0,
      0.5, 0.5, 0.0,
    ];
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i] *= width;
      vertices[i + 1] *= height;
    }
    const indices = [3, 2, 1, 3, 1, 0];
    const normals = [
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
    const uvs = [
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];

    super(vertices, indices, normals, uvs);
  }

}
