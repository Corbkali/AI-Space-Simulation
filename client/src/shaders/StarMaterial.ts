import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Simplified shader to fix crash
const StarMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      vec3 finalColor = color + vec3(pulse * 0.2);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ StarMaterial });

export { StarMaterial };
