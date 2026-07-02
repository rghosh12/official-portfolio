'use client'

import { useEffect, useRef } from 'react'

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }
    glRef.current = gl

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Failed to create shader')
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error('Shader compilation error: ' + info)
      }
      return shader
    }

    const vertSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragSrc = `
      precision highp float;

      uniform vec2 iResolution;
      uniform float iTime;

      vec3 hash( vec3 p ) {
        p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                  dot(p,vec3(269.5,183.3,246.1)),
                  dot(p,vec3(113.5,271.9,124.6)));
        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
      }

      float noise( in vec3 p ) {
        vec3 i = floor( p );
        vec3 f = fract( p );
        vec3 u = f*f*(3.0-2.0*f);
        return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
                            dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                       mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
                            dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                  mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
                            dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                       mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
                            dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec3 stars_direction = normalize(vec3(uv * 2.0 - 1.0, 1.0));
        float stars_threshold = 8.0;
        float stars_exposure = 200.0;
        float stars = pow(clamp(noise(stars_direction * 200.0), 0.0, 1.0), stars_threshold) * stars_exposure;
        stars *= mix(0.4, 1.4, noise(stars_direction * 100.0 + vec3(iTime)));
        gl_FragColor = vec4(vec3(stars),1.0);
      }
    `

    try {
      const vertShader = compileShader(vertSrc, gl.VERTEX_SHADER)
      const fragShader = compileShader(fragSrc, gl.FRAGMENT_SHADER)

      const program = gl.createProgram()
      if (!program) throw new Error('Failed to create program')

      gl.attachShader(program, vertShader)
      gl.attachShader(program, fragShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program)
        throw new Error('Program linking error: ' + info)
      }

      gl.useProgram(program)
      programRef.current = program

      const posLoc = gl.getAttribLocation(program, 'position')
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      )
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      const iResolution = gl.getUniformLocation(program, 'iResolution')
      const iTime = gl.getUniformLocation(program, 'iTime')

      const render = (time: number) => {
        if (!gl || !canvas) return
        
        gl.uniform2f(iResolution, canvas.width, canvas.height)
        gl.uniform1f(iTime, time * 0.001)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
        
        animationFrameRef.current = requestAnimationFrame(render)
      }

      animationFrameRef.current = requestAnimationFrame(render)
    } catch (error) {
      console.error('WebGL setup error:', error)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resize)
      if (programRef.current && glRef.current) {
        glRef.current.deleteProgram(programRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#000000' }}
    />
  )
}
