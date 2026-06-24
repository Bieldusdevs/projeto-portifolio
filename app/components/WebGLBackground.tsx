'use client'

// ============================================
// WEBGL BACKGROUND — Fundo animado com shader GLSL
// Tecnologia: React Three Fiber + Three.js + GLSL Shader
// WebGPU: mencionado como progressive enhancement (Three.js usa WebGL 2 por padrão, com fallback)
// EDITE: shader em fragmentShader para mudar visual
// ============================================
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Vertex shader: passa UV para o fragment
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Fragment shader: cria gradiente animado com noise e glow do mouse
// ============================================
// EDITE AQUI: cores, intensidade do noise, velocidade
// ============================================
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Função simplex noise 2D
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 x1 = x0.xy + C.xx;
    vec2 x2 = x0.xy + C.yy;
    vec4 a = permute( permute( x0.xy + vec2(0.0,0.0))
                  + x0.yx + vec2(0.0,1.0));
    vec4 b = permute( permute( x1.xy + vec2(0.0,0.0))
                  + x1.yx + vec2(0.0,1.0));
    vec4 c = permute( permute( x2.xy + vec2(0.0,0.0))
                  + x2.yx + vec2(0.0,1.0));
    vec4 d = permute( permute( x2.xy + vec2(1.0,1.0))
                  + x2.yx + vec2(1.0,1.0));
    vec4 x = fract( vec4( a.x, b.x, c.x, d.x ) * 0.175 );
    vec4 y = fract( vec4( a.y, b.y, c.y, d.y ) * 0.175 );
    vec4 z = fract( vec4( a.z, b.z, c.z, d.z ) * 0.175 );
    vec4 w = fract( vec4( a.w, b.w, c.w, d.w ) * 0.175 );
    vec2 g = 2.0 * vec2( x.x - 0.5, x.y - 0.5 );
    vec2 h = 2.0 * vec2( y.x - 0.5, y.y - 0.5 );
    vec2 i0 = vec2( x.x - 0.5, y.x - 0.5 );
    float n = dot( i0, g ) + dot( i0, h ) * 0.5;
    return 70.0 * n;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.5 + 0.5;

    // Noise em múltiplas escalas
    float n1 = snoise(uv * 2.5 + uTime * 0.08);
    float n2 = snoise(uv * 5.0 - uTime * 0.12);

    // Glow sutil seguindo o mouse
    float dist = distance(uv, mouse);
    float glow = smoothstep(0.5, 0.0, dist) * 0.25;

    // Cor base + accent
    vec3 colorBase = vec3(0.04, 0.04, 0.06);
    vec3 colorAccent = vec3(0.23, 0.51, 0.96); // accent azul

    // Mistura com base no noise + glow
    vec3 color = mix(colorBase, colorAccent, (n1 + n2) * 0.25 + glow);

    // Vignette nas bordas
    float vignette = smoothstep(1.4, 0.4, length(uv - 0.5));
    color *= vignette * 0.85 + 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      // Lerp suave do mouse
      materialRef.current.uniforms.uMouse.value.lerp(state.mouse, 0.05)
      materialRef.current.uniforms.uResolution.value.set(
        state.size.width,
        state.size.height
      )
    }
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export default function WebGLBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
