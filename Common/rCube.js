<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>

<script src="../Common/webgl-utils.js"></script>
<script src="../Common/initShaders.js"></script>
<script src="../Common/MV.js"></script>
<script src="../Common/rCube.js"></script>
<script src="cube.js"></script>

<script id="Cube-vertex-shader" type="x-shader/x-vertex">
attribute vec4 vPosition;
attribute vec2 aTextureCoord;


uniform mat4 MV;

void main()
{
    gl_PointSize = 5.0;
    gl_Position = MV * vPosition;
    fTexCoord = aTextureCoord;

}
</script>

<script id="Cube-fragment-shader" type="x-shader/x-fragment">
precision highp float;
varying vec2 fTextCoord;

unifrom sampler2D tex;

void main()
{
    gl_FragColor = texture2D(tex, fTexCoord); 
}
</script>
</head>

<body>
<canvas id="webgl-canvas" width="512" height="512" style="background-color: #0000FF"></canvas>
</body>
</html>
