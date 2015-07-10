/*
* Created by Jorge Martínez on 07/2015 for the "Interactive Computer Graphics with WebGL" 
*    course at coursera.org
* Some of the following code has been re-purposed from the example code of the course.
*/

"use strict";

var canvas;
var gl;

var points = [];

var polyType = 0;
var tesselationLevel = 1;

var theta = 0.0;
var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load initial data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    recalculateTessellation();

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    // Set html element callbacks (sliders and controls)
    document.getElementById("slider").onchange = function() 
    {
        theta = event.srcElement.value;
        gl.uniform1f(thetaLoc, theta);
        render();
    };

    document.getElementById("sliderTess").onchange = function() 
    {
        tesselationLevel = event.srcElement.value;
        recalculateTessellation();
    }

    document.getElementById("polygonType").onclick = function( event) {
        polyType = event.srcElement.index;
        recalculateTessellation();
    }
    render();
};

// Calculate new triangles based on tessellation level and polygon type
function recalculateTessellation()
{
    points = [];
    switch(polyType)
    {
        case 0:
            var vertices = [
                    vec2( -0.7, -0.7 ),
                    vec2(  0,  0.7 ),
                    vec2(  0.7, -0.7 )
                ];
            break;
        case 1:
            var vertices = [
                    vec2( -0.7, -0.7 ),
                    vec2( -0.7,  0.7 ),
                    vec2(  0.7, -0.7 ),
                    vec2( -0.7,  0.7 ),
                    vec2(  0.7, -0.7 ),
                    vec2(  0.7,  0.7 )
                ];
            break;
        case 2:
            var vertices = [
                    vec2( -0.6, -0.6 ),
                    vec2( -0.6,  0 ),
                    vec2(  0, -0.6 ),
                    vec2( -0.6,  0 ),
                    vec2(  0, -0.6 ),
                    vec2(  0,  0 ),
                    vec2( 0, 0),
                    vec2( 0.6, 0),
                    vec2( 0.6, 0.6),
                    vec2( 0.6, 0.6),
                    vec2( 0, 0.6),
                    vec2( 0, 0),
                    vec2( 0, 0),
                    vec2( 0, -0.6),
                    vec2( 0.6, 0)
                ];
            break;
    }
    for(var i = 0; i < vertices.length; i+=3)
    {
        divideTriangle(vertices[i], vertices[i+1], vertices[i+2], tesselationLevel);
    }
    // Update data and render the new triangles
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.DYNAMIC_DRAW);
    render();
}

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{
    // check for end of recursion

    if ( count === 0 ) {
        triangle( a, b, c );
    }
    else {

        //bisect the sides

        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // four new triangles

        divideTriangle(a, ab, ac, count);
        divideTriangle(c, ac, bc, count);
        divideTriangle(b, bc, ab, count);
        divideTriangle(ac, bc, ab, count);
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
