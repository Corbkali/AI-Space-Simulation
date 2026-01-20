import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitalStructureProps {
    radius: number;
    techLevel: number;
    color: string;
}

// Low Tech (0.5 - 1.2): Satellites / Stations
const SatelliteSwarm = ({ radius, count, color }: { radius: number, count: number, color: string }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const satellites = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            speed: 0.5 + Math.random() * 0.5,
            offset: (i / count) * Math.PI * 2,
            yOffset: (Math.random() - 0.5) * 0.5,
        }));
    }, [count]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const elapsedTime = clock.getElapsedTime();

        satellites.forEach((data, i) => {
             const time = elapsedTime * data.speed;
             dummy.position.x = Math.sin(time + data.offset) * (radius + 0.5);
             dummy.position.z = Math.cos(time + data.offset) * (radius + 0.5);
             dummy.position.y = Math.sin(time * 2 + data.offset) * data.yOffset;
             dummy.rotation.y = time;
             dummy.updateMatrix();
             meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.05, 0.05, 0.1]} />
            <meshBasicMaterial color={color} />
        </instancedMesh>
    );
};

// Medium Tech (1.2 - 2.0): Orbital Rings & Space Elevators
const OrbitalRing = ({ radius, color }: { radius: number, color: string }) => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2;
            ringRef.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius + 0.8, 0.05, 16, 100]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
    );
};

// High Tech (2.0+): Energy Absorbers / Mega Structures
const EnergyBeams = ({ radius, color }: { radius: number, color: string }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = -clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Hexagonal Shield / Sphere segments */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, Math.PI / 4]} position={[0, 0, 0]}>
                    <ringGeometry args={[radius + 1.5, radius + 2.0, 3]} />
                    <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} wireframe />
                </mesh>
            ))}

            {/* Energy Spikes */}
            {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={`spike-${i}`} rotation={[0, (i / 4) * Math.PI * 2, 0]}>
                    <boxGeometry args={[0.2, radius * 4, 0.2]} />
                    <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};


export const OrbitalStructures = ({ radius, techLevel, color: _color }: OrbitalStructureProps) => {
    const structureColor = techLevel > 2.0 ? '#00ffff' : (techLevel > 1.2 ? '#ffaa00' : '#cccccc');

    return (
        <group>
            {/* Type 0.5 - 1.2: Satellites */}
            {techLevel >= 0.5 && (
                <SatelliteSwarm radius={radius} count={Math.floor(techLevel * 20)} color={structureColor} />
            )}

            {/* Type 1.2+: Orbital Ring */}
            {techLevel >= 1.2 && (
                <OrbitalRing radius={radius} color={structureColor} />
            )}

            {/* Type 2.0+: Energy Beams/Megastructures */}
            {techLevel >= 2.0 && (
                <EnergyBeams radius={radius} color="#ff00ff" />
            )}
        </group>
    );
};
