/*
* Created by Jorge Martínez on 08/2015 for the "Interactive Computer Graphics with WebGL" 
*    course at coursera.org
* Some of the following code has been re-purposed from the example code of the course.
*/

"use strict";

var canvas;
var gl;

var points = [];

var mouseDown = false;

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

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Set html callbacks
    canvas.addEventListener("mousedown", function(event){ mouseDown = true; });
    canvas.addEventListener("mouseup", function(event){ mouseDown = false; });
    canvas.addEventListener("mousemove", function(event)
    {
        if(mouseDown)
        {
            var x; var y;
            var rect =  event.currentTarget.getBoundingClientRect();
            x = -1.0 + (2.0 * (event.clientX - rect.left)/ canvas.width);
            y = -1.0 + (2.0 * (canvas.height - (event.clientY - rect.top)) / canvas.height);
            addPoint(x, y);
        }
    });

    render();
};

function addPoint(x, y)
{
    points.push(vec2(x, y));
    // Update data and render the new points
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.DYNAMIC_DRAW);
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINE_STRIP, 0, points.length );
}
