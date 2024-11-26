precision highp float;

uniform mat4 worldView;
uniform float iteration;
uniform vec2 cc;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

float colors[30] = float[30](
    0., 0., 0.,
    0.83984375, 0.99609375, 0.9660377358490566,
    0.546875, 0.83984375, 0.033962264150943396,
    0.46484375, 0.68359375, 0.018867924528301886,
    0.15625, 0.34765625, 0.45660377358490567,
    0.9, 0.8, 0.4,
    0.8, 0.56, 0.4,
    0.7, 0.9, 0.5,
    0.5, 0.3, 0.8,
    0.4, 0.6, 0.7);

vec2 ComMulti(vec2 v1, vec2 v2) {
    return vec2(
        v1[0] * v2[0] - v1[1] * v2[1],
        v1[0] * v2[1] + v2[0] * v1[1]
    );
}

float C1(vec2 v) {
    return v[0] * v[0] + v[1] * v[1];
}


float C2(vec2 v) {
    return v[0] * v[0] - v[1] * v[1];
}

float getIteration() {
    vec2 zuv = vec2( (vUV[0]) * 3.5 - 1.75 , vUV[1]  * 3.5 - 1.75 );
    float inter = 0.;

    while (C1(zuv) < 4. && inter < iteration) {
        float xx = C2(zuv);
        zuv[1] = 2.0 * zuv[0] * zuv[1] + cc[1];
        zuv[0] = xx + cc[0];
        inter += 1.;
    }

    return inter;
}

void main(void) {
    vec3 color = vec3(1., 1., 1.);
    float ii = getIteration();
    int index = int(ii) % 5;

    color = vec3(1., 1., 1.) * (ii / iteration) * 10.;

    color = vec3(colors[index * 3], colors[index * 3 + 1], colors[index * 3 + 2]);

    gl_FragColor = vec4(color, 1.);
}

