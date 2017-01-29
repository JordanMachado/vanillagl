precision highp float;
varying vec2 vUv;
uniform float time;
uniform sampler2D map;

void main() {
  vec4 tex = texture2D(map, vUv);
  gl_FragColor = vec4(vUv, cos(time), 1.0);
  gl_FragColor = vec4(tex);
}
