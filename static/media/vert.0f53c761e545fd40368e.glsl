#version 300 es
#pragma vscode_glsllint_stage: vert

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 cameraProjection;

uniform float uFrame;
uniform vec2 uMouse;

layout(location=0) in vec4 aPosition;
layout(location=1) in vec4 aColor;

out vec4 vColor;
out vec4 vPos;





void main(){
    highp vec4 pos = vec4(aPosition);
    pos[2]+=0.1;


    vPos = vec4(pos.xyz, 1.);
    // vColor = vec4(0, dis, 0.0 , sin(uFrame * 0.3) + 1.25);
    // vColor = vec4(gl_PointCoord.x, gl_PointCoord.y, 0.0,  0.);
    // vColor = vec4(gl_FragCoord.x, gl_FragCoord.y, 0.0,  1.);
    vColor = vec4(1.0, .0, .0, 1.0);
    
    gl_PointSize = 5.;

    gl_Position = cameraProjection * uModel * pos;





}




