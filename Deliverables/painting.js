/*
* Created by Jorge Martínez on 08/2015 for the "Interactive Computer Graphics with WebGL" 
*    course at coursera.org
* Some of the following code has been re-purposed from the example code of the course.
*/

"use strict";

var canvas;
var gl;

var points = [];
var indexs = [];
var widths = [];
var colors = [];
var currentWidth = 1.0;
var currentColor = 0;
var index = 0;

var mouseDown = false;

var colorBuffer;
var positionBuffer;

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

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Associate out shader variables with our data buffer

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Load initial data into the GPU

    positionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Set html callbacks
    canvas.addEventListener("mousedown", function(event){ 
        mouseDown = true;
        indexs[index] = points.length;
        widths[index] = currentWidth;
        var x; var y;
        var rect =  event.currentTarget.getBoundingClientRect();
        x = -1.0 + (2.0 * (event.clientX - rect.left)/ canvas.width);
        y = -1.0 + (2.0 * (canvas.height - (event.clientY - rect.top)) / canvas.height);
        addPoint(x, y);
    });
    canvas.addEventListener("mouseup", function(event){ 
        mouseDown = false;
        index++; 
    });
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

    document.getElementById("slider").onchange = function(event) 
    {
        currentWidth = getTarget(event).value;
        render();
    };

    document.getElementById("colorSelect").onclick = function(event) {
        currentColor = getTarget(event).index;
    }

    window.addEventListener("keydown", function(event)
    {
        switch(event.keyCode)
        {
            case 32: // spacebar
                points.length = 0;
                indexs.length = 0;
                widths.length = 0;
                index = 0;
                render();
                break;
        }
    });

    render();
};

function getColorFromId(id)
{
    switch(id)
    {
        case 0:
            return vec3(1.0, 0.0, 0.0);
            break;
        case 1:
            return vec3(0.0, 1.0, 0.0);
            break;
        case 2:
            return vec3(0.0, 0.0, 1.0);
            break;
    }
}

function addPoint(x, y)
{
    // Update data and render the new points
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    colors.push(getColorFromId(currentColor));
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    points.push(vec2(x, y));
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.DYNAMIC_DRAW);

    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i < indexs.length; i++)
    {
        gl.lineWidth(widths[i]); // Line width aparently not working in windows >.<
        var end = points.length - indexs[i];
        if(i < indexs.length - 1)
        {
            end = indexs[i+1] - indexs[i];
        }
        var o = points.length;
        gl.drawArrays( gl.LINE_STRIP, indexs[i], end );
    }
}
