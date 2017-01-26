
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 worldMatrix;
uniform mat4 normalMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying vec3 vNormal;


void main() {

	vec4 pos = vec4(position, 1.0);
	vec4 worldPos = worldMatrix * pos;
	vec4 transformedNormal =  vec4(normal, 1.0) * normalMatrix;
	vNormal = transformedNormal.xyz;
	vUv = uv;


	gl_PointSize = 10.0;
	gl_Position = projectionMatrix * viewMatrix * worldPos;
}
