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
    let thePos: vec4<f32> = uniforms.mvpMatrix * pos;

    output.Position = vec4<f32>(thePos);
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
fn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
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
    // var radi: f32 = 2.;
    // var dist: f32 = distance(vec2<f32>(0, 0), vec2<f32>(2,2));
    // var alpha: f32 = smoothstep(radi - 0.01, radi, dist);
    // return vec4<f32>(1.0, 0.0, 0.0, 20); // Red circle with varying alpha (transparency)

    // input.position.xy;

    // var len = distance(pos.xy, mouseData.mousePosition.xy);
    // color.x = len;
    // output.vColor = color;

    //    // Calculate the distance from the center of the circle
    // var center: vec2<f32> = vec2<f32>(0.5, 0.5); // Assuming circle center at (0.5, 0.5) in normalized coordinates
    // var distance: f32 = distance(center, gl_FragCoord.xy);

    // // Inside the circle if the distance is less than the radius
    // if (distance < uniforms.radius) {
    //     return vec4<f32>(1.0, 0.0, 0.0, 1.0); // Red color for the circle
    // } else {
    //     discard; // Discard fragments outside the circle
    // }


    var outputColor: vec4<f32> = vec4<f32>((sin((mouseData.mousePosition.z + 0.5) * 2) * 0.5) + 0.5, mouseData.mousePosition.xy, 1);
    // var outputColor: vec4<f32> = vec4<f32>(input.position.xy , 1.0, 1.0);
    return outputColor;
    // // return vColor;
}



// // Vertex shader input
// struct VertexInput {
//     [[location(0)]] position: vec2<f32>;
// };

// // Vertex shader output
// struct VertexOutput {
//     [[builtin(position)]] position: vec4<f32>;
// };

// // Uniforms
// [[block]]
// struct Uniforms {
//     radius: f32;
// };

// [[binding(0), group(0)]]
// var<uniform> uniforms: Uniforms;

// // Vertex shader function
// [[stage(vertex)]]
// fn main_vertex(input: VertexInput) -> VertexOutput {
//     var output: VertexOutput;
//     output.position = vec4<f32>(input.position, 0.0, 1.0);
//     return output;
// }

// // Fragment shader function
// [[stage(fragment)]]
// fn main_fragment() -> [[location(0)]] vec4<f32> {
//     // Calculate the distance from the center of the circle
//     var center: vec2<f32> = vec2<f32>(0.5, 0.5); // Assuming circle center at (0.5, 0.5) in normalized coordinates
//     var distance: f32 = distance(center, gl_FragCoord.xy);

//     // Inside the circle if the distance is less than the radius
//     if (distance < uniforms.radius) {
//         return vec4<f32>(1.0, 0.0, 0.0, 1.0); // Red color for the circle
//     } else {
//         discard; // Discard fragments outside the circle
//     }
// }
