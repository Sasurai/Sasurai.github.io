/*
* Created by Jorge Martínez on 07/2015 for the "Interactive Computer Graphics with WebGL" 
*/

// Utility method for cross-browser compatibility (i.e. firefox XD)
function getTarget(event)
{
    if (event.target) return event.target; 
    else if (event.srcElement) return event.srcElement;
}
