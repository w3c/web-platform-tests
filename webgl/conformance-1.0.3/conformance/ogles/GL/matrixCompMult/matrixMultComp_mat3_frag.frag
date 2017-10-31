
/*
** Copyright (c) 2012 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/


#ifdef GL_ES
precision mediump float;
#endif
varying vec4 color;

void main (void)
{
    mat3 m1 = mat3(color.rgb, color.rgb, color.rgb);
    mat3 m2 = mat3(1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 0.5, 0.5, 1.0);
    mat3 m3 = mat3(0.0);
    vec3 result = vec3(0.0, 0.0, 0.0);

    m3 = matrixCompMult(m1, m2);

    result[0] += m3[0][0];
    result[0] += m3[0][1];
    result[0] += m3[0][2];

    result[1] += m3[1][0];
    result[1] += m3[1][1];
    result[1] += m3[1][2];

    result[2] += m3[2][0];
    result[2] += m3[2][1];
    result[2] += m3[2][2];

    gl_FragColor = vec4(result / 2.0, 1.0);
}
