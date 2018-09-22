
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
    this.color = {
        values: new Color([
            1.0, 1.0, 1.0, 1.0, //white
            1.0, 1.0, 1.0, 1.0, //white
            1.0, 1.0, 1.0, 1.0, //white
            1.0, 1.0, 1.0, 1.0, //white

            1.0, 0.0, 0.0, 1.0, //red
            1.0, 0.0, 0.0, 1.0, //red
            1.0, 0.0, 0.0, 1.0, //red
            1.0, 0.0, 0.0, 1.0, //red

        ])


    }
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

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
