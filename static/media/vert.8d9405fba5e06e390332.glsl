#version 300 es
#pragma vscode_glsllint_stage: vert

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 cameraProjection;


layout(location=0) in vec4 aPosition;

out vec4 vColor;

void main()
{
    vColor = vec4(aPosition.xyz, 1);
    gl_Position = cameraProjection * uModel * aPosition;
}