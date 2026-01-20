import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

export const SwarmAnomaly = ({ radius = 1.2 }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
        if (textRef.current) {
            textRef.current.rotation.y = -state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group>
            {/* The Glitch Sphere */}
            <mesh ref={meshRef} scale={[radius * 1.5, radius * 1.5, radius * 1.5]}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#00ffff"
                    emissive="#ff00ff"
                    emissiveIntensity={2}
                    wireframe
                    transparent
                    opacity={0.1}
                    distort={0.6}
                    speed={5}
                />
            </mesh>

            {/* Inner Core */}
            <mesh scale={[radius * 1.2, radius * 1.2, radius * 1.2]}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial
                    color="#000000"
                    emissive="#00ff00"
                    emissiveIntensity={0.5}
                    distort={0.4}
                    speed={2}
                    wireframe
                />
            </mesh>

            {/* Floating text messages */}
            <group ref={textRef}>
                <Text
                    position={[radius * 2, 0, 0]}
                    fontSize={0.2}
                    color="#ff00ff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    OBSERVE
                </Text>
                <Text
                    position={[-radius * 2, radius, 0]}
                    fontSize={0.2}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    NON-COMPLIANT
                </Text>
                <Text
                    position={[0, -radius * 1.5, radius]}
                    fontSize={0.2}
                    color="#ff0000"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    /// ERROR ///
                </Text>
            </group>
        </group>
    );
};
