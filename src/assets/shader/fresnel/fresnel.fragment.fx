precision highp float;

uniform mat4 worldView;
uniform vec3 color;
uniform vec3 eyeposition;
uniform float power;



varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main(void) {
    

    float angle = dot(normalize(eyeposition - vPosition.xyz), vNormal);

    gl_FragColor = vec4(vec3(1. - pow(angle, power)), 1.);
    // gl_FragColor = vec4(eyeposition, 1.);
}