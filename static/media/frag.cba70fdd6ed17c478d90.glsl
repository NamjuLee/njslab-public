#version 300 es
#pragma vscode_glsllint_stage: frag

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

precision mediump float;

in vec4 vColor;
in vec4 vPos;

out vec4 fragColor;



float circle(in vec2 st, in float radius) {
    vec2 dist = st - vec2(0.5);
    return 1.0 - smoothstep(
       radius - (radius * 0.01),
       radius +(radius * 0.01),
       dot(dist, dist) * 4.0);
}


float aastep(float threshold, float value) {
	float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
	return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

void main()
{
    // vec4 col;
    // vec2 p =  vec2(gl_PointCoord.xy);

    // if ( length(p -vec2(0.5,0.5)) < 1.){
    //     col = vec4(p.x, p.y ,0. ,1.) ;
    // }else{
    //     // discard;
    //     // col = vec4(0.,0.,0., 0.) ;
    // }


    // if ( length(vPos.xy-vec2(0.5,0.5)) < 0.2){
    //     fragColor = vec4(1,0.,0.,1.) ;
    // }else{
    //     fragColor = vec4(0.,0.,0.,1.) ;
    // }
    // return ;

    // float r = 0.0, delta = 0.0, alpha = 1.0;
    // vec2 cxy = 2.0 * vPos - 1.0;
    // r = dot(cxy, cxy);

    // if (r > 1.0) {
    //     discard;
    // }
    // gl_FragColor = vColor * (alpha);
    // fragColor = gl_FragColor;

    // fragColor = vec4(vPos.xyz, 1);
    // fragColor = vec4(1., 0., 0., 1.);




    // float r = 0.0, delta = 0.0, alpha = 1.0;
    // vec2 cxy = 2.0 * p - 1.0;
    // r = dot(cxy, cxy);

    // if (r > 1.0) {
    //     discard;
    // }

    // // // #ifdef GL_OES_standard_derivatives
    // delta = fwidth(r);
    // alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);

    // fragColor = col * alpha;








    // https://stackoverflow.com/questions/70537724/drawing-a-circle-using-smoothstep-with-dot-or-length-produces-different-re
    // https://codepen.io/mikrosystheme/pen/VwdJamY?editors=0010
    vec4 v_fill_color =   vec4(1. , 1. , 1. , 1.);
    vec4 v_stroke_color = vec4(1., 0.,0. , 1.);
    float v_stroke_width = 0.2;

	//vec2 uv = gl_FragCoord.xy; // 0..pointsize
	vec2 uv = gl_PointCoord.xy; // 0..1;
	uv = uv * 2.0 - 1.0; // -1.0 .. +1.0
	float d = length(uv);
	float aa = aastep( 1.0, d );
	float aa2 = aastep( 1.0 - v_stroke_width, d );
	fragColor = vec4(uv, 0.0, aa) + v_fill_color; //vec4(1.0, 0.0, 0.0, 1.0);

    vec4 theColor = mix(v_stroke_color, vec4(0.0), aa);

    if (theColor.w < 0.2) {
        discard;
    }

	fragColor = theColor; //vec4(vec3(aa),1.0);
	fragColor = mix(v_fill_color, fragColor, aa2);
	// Meh... c'è da lavorarci, soprattutto per via di mix che stiamo facendo 
	// tra screenspace e clipspace.

    

}



