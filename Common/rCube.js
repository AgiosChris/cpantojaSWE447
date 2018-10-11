
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values: new Float32Array([
            //Face 1, front 
            0, 0, 0, //Vertex 00
            0.5, 0, 0, //Vertex 01
            0.5, 0.5, 0, //Vertex 02
            0, 0.5, 0, //Vertex 03
            //Face 2, back
            0.5, 0, 0.5, //Vertex 04
            0, 0, 0.5, //Vertex 05
            0, 0.5, 0.5, //Vertex 06
            0.5, 0.5, 0.5, //Vertex 07
            //Face 3, top
            0, 0.5, 0, //Vertex 08
            0.5, 0.5, 0, //Vertex 09
            0.5, 0.5, 0.5, //Vertex 10
            0, 0.5, 0.5, //Vertex 11
            //Face 4, bottom
            0, 0, 0, //Vertex 12
            0.5, 0, 0, //Vertex 13
            0.5, 0, 0.5, //Vertex 14
            0, 0, 0.5, //Vertex 15
            //Face 5, right
            0, 0, 0.5, //Vertex 16
            0, 0, 0, //Vertex 17
            0, 0.5, 0, //Vertex 18
            0, 0.5, 0.5, //Vertex 19
            //Face 6, left
            0.5, 0, 0, //Vertex 20
            0.5, 0, 0.5, //Vertex 21
            0.5, 0.5, 0.5, //Vertex 22
            0.5, 0.5, 0  //Vertex 23
            ]),
        numComponents : 3
    };
    //this.colors =
    //    {
    //        values : new Float32Array([
    //        1.0, 1.0, 0.0, // Vertex 00 
    //        1.0, 1.0, 0.0, // Vertex 01 
    //        1.0, 1.0, 0.0, // Vertex 02 
    //        1.0, 1.0, 0.0, // Vertex 03

    //        1.0, 0.0, 0.0, // Vertex 04 
    //        1.0, 0.0, 0.0, // Vertex 05 
    //        1.0, 0.0, 0.0, // Vertex 06 
    //        1.0, 0.0, 0.0, // Vertex 07 

    //        1.0, 1.0, 1.0, // Vertex 00 
    //        1.0, 1.0, 1.0, // Vertex 01 
    //        1.0, 1.0, 1.0, // Vertex 02 
    //        1.0, 1.0, 1.0, // Vertex 03 

    //        0.0, 1.0, 1.0, // Vertex 00 
    //        0.0, 1.0, 1.0, // Vertex 01 
    //        0.0, 1.0, 1.0, // Vertex 02 
    //        0.0, 1.0, 1.0, // Vertex 03 

    //        0.0, 1.0, 0.0, // Vertex 00 
    //        0.0, 1.0, 0.0, // Vertex 01 
    //        0.0, 1.0, 0.0, // Vertex 02 
    //        0.0, 1.0, 0.0, // Vertex 03 

    //        0.0, 0.0, 0.0, // Vertex 00 
    //        0.0, 0.0, 0.0, // Vertex 01 
    //        0.0, 0.0, 0.0, // Vertex 02 
    //        0.0, 0.0, 0.0, // Vertex 03 
    //        ]),
    //        numComponents : 3
    //    };

    this.textures = { // texture coords
        values: new Float32Array([
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]),
        numComponents: 2
    };
    this.indices = { 
        values : new Uint16Array([
            0, 1, 2,     0, 2, 3, //Trianglilated Face 1
            4, 5, 6,     4, 6, 7, //Trianglilated Face 2
            8, 9, 10,    8, 10, 11, //Trianglilated Face 3
            12, 14, 13,  15, 14, 12, //Trianglilated Face 4
            16, 17, 18,  16, 18, 19, //Trianglilated Face 5
            20, 21, 22,  20, 22, 23 //Trianglilated Face 6
        ])
    };
    this.indices.count = this.indices.values.length;

    this.initTexture = function () {
        texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function () {
            handleLoadedTexture(texImage, texture);
        }
            texImage.src = "monkey.png"; 
    }
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    //// colors
    //this.colors.buffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
    //gl.bufferData(gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW);
    //this.colors.attributeLoc = gl.getAttribLocation(this.program, "vColor");
    //gl.enableVertexAttribArray(this.colors.attributeLoc);

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray(this.positions.attributeLoc);

    // Texture
    this.initTexture();
    //this.texture = loadTexture(gl, "/home/saeid/Projects/WebGL/webgl-examples/tutorial/Mysample6/cubetexture.png");
    //texture = loadTexture(gl, "cubetexture.png");

    this.textures.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.textures.values, gl.STATIC_DRAW);
    this.textures.attributeLoc = gl.getAttribLocation(this.program, "aTextureCoord");
    gl.enableVertexAttribArray(this.textures.attributeLoc);

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        //gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        //gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
        //    gl.FLOAT, gl.FALSE, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
        gl.vertexAttribPointer(this.colors.attributeLoc, this.colors.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
        gl.vertexAttribPointer(this.textures.attributeLoc, this.textures.numComponents, gl.FLOAT, gl.FALSE, 0, 0);


        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.uniforms.uSampler, 0);

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};

handleLoadedTexture = function (image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //image = texture.image;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //if (isPowerOf2(image.width) && isPowerOf2(image.height)) 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}
