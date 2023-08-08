#version 300 es
#pragma vscode_glsllint_stage: vert

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 cameraProjection;


layout(location=0) in vec4 aPosition;
layout(location=1) in vec4 aColor;

out vec4 vColor;

void main()
{
    vColor = aColor;
    gl_Position = cameraProjection * uModel * aPosition;
}