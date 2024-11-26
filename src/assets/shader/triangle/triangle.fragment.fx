precision highp float;

uniform mat4 worldView;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

uniform int pointsNumber;
uniform float points[50];

bool isInShape() {
    bool result = true;
    for (int i = 0; i < pointsNumber; ++i) {
        int j = (i + 1) % pointsNumber;
        vec3 v1 = vec3(points[i * 2], points[i * 2 + 1], .0);
        vec3 v2 = vec3(points[j * 2], points[j * 2 + 1], .0);
        vec3 v3 = vec3(vUV, .0);

        
        vec3 dir1 = v2 - v1;
        vec3 dir2 = v3 - v1;

        vec3 cro = cross(dir1, dir2);

        if (cro.z * vNormal.z > -0.) {
            result = false;
            break;
        }
        
        
    }
    return result;
}


void main(void) {

    vec3 base = vec3(vUV, 0.);

    if (isInShape() == true) {
        base = vec3(1.0, 1.0, 0.);
    }


    gl_FragColor = vec4( base, 1. );
}