import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

export const AtmosphereMaterial = shaderMaterial(
    {
        color: new THREE.Color(0.5, 0.7, 1.0),
        viewVector: new THREE.Vector3(0, 0, 0),
    },
    // Vertex Shader
    `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform vec3 color;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(color, 1.0) * intensity;
    }
  `
);

extend({ AtmosphereMaterial });
