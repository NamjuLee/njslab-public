// vertex shader

struct Uniforms {
    mvpMatrix : mat4x4<f32>,
    // uniform Mouse : vec4<f32>; 

};
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

// @binding(1) @group(0) var<uniform> u_mouse : Uniforms;

// [[block]]
struct MouseData {
    mousePosition : vec3<f32>
};
// [[group(0), binding(0)]]
@binding(0) @group(1) var<uniform> mouseData: MouseData;
@binding(0) @group(2) var<uniform> frame : u32;

struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) vColor : vec4<f32>,
    @location(1) vPos : vec4<f32>,
};

@vertex
fn vs_main(@location(0) pos: vec4<f32>, @location(1) color: vec4<f32>) -> Output {
    var output: Output;
    output.Position = uniforms.mvpMatrix * pos;
    output.vPos = vec4<f32>(1,1,1,1);

    return output;
}

// fragment shader
// [[uniform(0)]] var<vec2<f32>> u_mouse;


struct Input {
    @builtin(position) Position : vec4<f32>,
    @location(0) vColor : vec4<f32>,
    @location(1) vPos : vec4<f32>,
};

@fragment
// fn fs_main(input: Input) -> @location(0) vec4<f32> {
fn fs_main(@location(0) vColor: vec4<f32>, @location(1) vPos: vec4<f32>) -> @location(0) vec4<f32> {
    // 
    // var outputColor = vec4<f32>(mouseData, 0.0, 1.0);
    // return outputColor;
    // if (mouseData.mousePosition.x > 1) {
//    var mouseX = mouseData.mousePosition.x;
//     var mouseY = mouseData.mousePosition.y;
//     // }
//     if (mouseX > 1 ) {
//         mouseX = 1;
//     }

    // input.position.xy;

    // var len = distance(pos.xy, mouseData.mousePosition.xy);
    // color.x = len;
    // output.vColor = color;

    var outputColor: vec4<f32> = vec4<f32>(mouseData.mousePosition.xy , sin(mouseData.mousePosition.z), 1.0);
    // var outputColor: vec4<f32> = vec4<f32>(input.position.xy , 1.0, 1.0);
    return outputColor;
    // return vColor;
}
