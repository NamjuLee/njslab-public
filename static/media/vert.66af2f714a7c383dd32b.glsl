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

float euclideanDistance(vec2 p1, vec2 p2) {
	float d1 = (p1.x - p2.x);
	float d2 = (p1.y - p2.y);
	return sqrt(pow(d1, 2.0) + pow(d2, 2.0));
}

void main(){
    highp vec4 pos = vec4(aPosition);

    vec2 v0 = vec2(uMouse.x, -uMouse.y);
    vec2 v1 = vec2(pos.xy);

    float dis = euclideanDistance(v0,v1);


    vColor = vec4(0, dis, 0.0 , sin(uFrame * 0.3) + 1.25);
    // vColor = vec4(aPosition.xyz, 0.);
    gl_PointSize = 10.;
    gl_Position = cameraProjection * uModel * pos;
}




