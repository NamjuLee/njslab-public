#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

in vec4 vColor;

out vec4 fragColor;

void main()
{
    fragColor = vec4(vColor.xyzw);

    // float r = 0.0, delta = 0.0, alpha = 1.0;
    // vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    // r = dot(cxy, cxy);
    // if (r > 1.0) {
    //     discard;
    // }
    // gl_FragColor = color * (alpha);
}



