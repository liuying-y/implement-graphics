precision highp float;

uniform mat4 worldView;
uniform float scaling;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main(void) {

    gl_FragColor = vec4(vPosition.xyz * scaling, 1.);
}