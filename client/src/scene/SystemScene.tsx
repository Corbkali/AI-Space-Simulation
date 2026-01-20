import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { StarMaterial } from '../shaders/StarMaterial';
import { AtmosphereMaterial } from '../shaders/AtmosphereMaterial';
import { PlanetSurfaceMaterial } from '../shaders/PlanetSurfaceMaterial';
import { StarSystem, PlanetData } from '../../../shared/types'; // Correct path

declare global {
    namespace JSX {
        interface IntrinsicElements {
            starMaterial: any;
            atmosphereMaterial: any;
            planetSurfaceMaterial: any;
        }
    }
}

extend({ StarMaterial, AtmosphereMaterial, PlanetSurfaceMaterial });

// Warp Tunnel Component
const WarpTunnel = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += delta * 4;
            // Pulse effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
            meshRef.current.scale.set(1, 1, scale * 3);
        }
    });

    return (
        <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[20, 5, 200, 32, 10, true]} />
            <meshBasicMaterial
                color="#00ffff"
                wireframe
                side={THREE.DoubleSide}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

interface PlanetProps {
    data: PlanetData;
    isSelected: boolean;
    onSelect: (planet: PlanetData) => void;
}

import { SwarmAnomaly } from './SwarmAnomaly';
import { OrbitalStructures } from './OrbitalStructures';

// ... (previous imports and code)

const Planet = ({ data, isSelected, onSelect }: PlanetProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const cloudRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    const seed = useMemo(() => Math.random(), []);
    const hasLife = useMemo(() => !!data.civilization, [data.civilization]);
    const hasAtmosphere = ['Terran', 'Oceanic', 'Gas Giant'].includes(data.biome);
    const techLevel = data.civilization?.techLevel || 0;

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y = clock.getElapsedTime() * data.orbitSpeed + data.angle;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
        if (cloudRef.current) {
            cloudRef.current.rotation.y += 0.007; // Clouds move faster
        }
    });

    return (
        <group>
            {/* ... (Orbit ring) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            <group ref={orbitRef} rotation={[0, 0, 0]}>
                <group position={[data.distance, 0, 0]}>

                    {/* VISUAL 5: AI Swarm Anomaly */}
                    {data.anomaly === 'AI_SWARM' && (
                        <SwarmAnomaly radius={data.radius} />
                    )}

                    {/* VISUAL 6: Orbital Structures (Spaceships & Mega-Engineering) */}
                    {hasLife && techLevel > 0.5 && (
                        <OrbitalStructures
                            radius={data.radius}
                            techLevel={techLevel}
                            color={data.color}
                        />
                    )}

                    {/* Main Planet Sphere */}
                    <mesh
                        ref={meshRef}
                        onClick={(e) => { e.stopPropagation(); onSelect(data); }}
                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                        onPointerOut={() => document.body.style.cursor = 'auto'}
                    >
                        <sphereGeometry args={[data.radius, 32, 32]} />
                        <planetSurfaceMaterial
                            ref={materialRef}
                            baseColor={new THREE.Color(data.color)}
                            secondaryColor={new THREE.Color(data.color).multiplyScalar(0.4)}
                            planetPosition={new THREE.Vector3(data.distance, 0, 0)}
                            noiseScale={2.0 + seed * 3.0}
                            hasCityLights={hasLife && techLevel >= 0.8 ? 1.0 : 0.0}
                        />
                    </mesh>

                    {/* VISUAL 3: Moving Cloud Layers */}
                    {hasAtmosphere && (
                        <mesh ref={cloudRef} scale={[1.02, 1.02, 1.02]}>
                            <sphereGeometry args={[data.radius, 32, 32]} />
                            <meshStandardMaterial
                                color="white"
                                transparent
                                opacity={0.3}
                                alphaMap={null}
                                blending={THREE.AdditiveBlending}
                            />
                        </mesh>
                    )}

                    {!isSelected && (
                        <mesh scale={[1.2, 1.2, 1.2]}>
                            <sphereGeometry args={[data.radius, 16, 16]} />
                            <atmosphereMaterial color={new THREE.Color(data.color)} transparent blending={THREE.AdditiveBlending} side={THREE.BackSide} />
                        </mesh>
                    )}

                    {/* Life Indicator */}
                    {hasLife && (
                        <Billboard
                            position={[0, data.radius + 2.5, 0]}
                            follow={true}
                        >
                            <Text fontSize={0.8} color="#00ffcc" outlineWidth={0.05} outlineColor="#000000" anchorY="bottom">
                                {data.civilization?.species.name}
                            </Text>
                            <Text fontSize={0.5} position={[0, -0.6, 0]} color="#aaaaaa" outlineWidth={0.02} outlineColor="#000000" anchorY="top">
                                Type {techLevel} Civ
                            </Text>
                        </Billboard>
                    )}

                    {isSelected && (
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[data.radius * 1.5, data.radius * 1.6, 32]} />
                            <meshBasicMaterial color="cyan" side={THREE.DoubleSide} />
                        </mesh>
                    )}
                </group>
            </group>
        </group>
    );
};

interface SystemSceneProps {
    system: StarSystem;
    selectedPlanetId: string | null;
    onSelectPlanet: (planet: PlanetData | null) => void;
    isWarping?: boolean; // New prop
}

export const SystemScene = ({ system, selectedPlanetId, onSelectPlanet, isWarping }: SystemSceneProps) => {
    const starRef = useRef<any>(null);

    useFrame(({ clock }) => {
        if (starRef.current && starRef.current.uniforms) {
            starRef.current.uniforms.time.value = clock.getElapsedTime();
        }
    });

    const isBlackHole = system.star.type === 'bh';

    // VISUAL 1: If warping, show tunnel INSTEAD of system
    if (isWarping) {
        return (
            <>
                <color attach="background" args={['#000000']} />
                <Stars radius={50} depth={0} count={5000} factor={4} saturation={0} fade speed={10} />
                <WarpTunnel />
            </>
        )
    }

    return (
        <>
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.1} />
            <pointLight
                position={[0, 0, 0]}
                intensity={isBlackHole ? 0.0 : 2.0}
                color={system.star.color}
                distance={200}
                decay={1.5}
            />

            {/* Star or Black Hole */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[system.star.radius, 32, 32]} />
                {isBlackHole ? (
                    <meshBasicMaterial color="black" />
                ) : (
                    <starMaterial ref={starRef} color={new THREE.Color(system.star.color)} />
                )}
            </mesh>

            {/* Black Hole Detail - Event Horizon Glow */}
            {isBlackHole && (
                <>
                    <mesh>
                        <sphereGeometry args={[system.star.radius * 1.05, 32, 32]} />
                        <meshBasicMaterial color="#220033" side={THREE.BackSide} transparent opacity={0.8} />
                    </mesh>
                    <mesh rotation={[Math.PI / 3, 0, 0]}>
                        <ringGeometry args={[system.star.radius * 2.5, system.star.radius * 5, 64]} />
                        <meshBasicMaterial
                            color="#8800ff"
                            side={THREE.DoubleSide}
                            transparent
                            opacity={0.4}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                </>
            )}

            {/* Planets */}
            {system.planets.map((planet) => (
                <Planet
                    key={planet.id}
                    data={planet}
                    isSelected={selectedPlanetId === planet.id}
                    onSelect={onSelectPlanet}
                />
            ))}

            <Stars radius={200} depth={50} count={1000} factor={4} saturation={0.5} fade speed={0.5} />
            <OrbitControls maxDistance={200} minDistance={10} enablePan={true} />
        </>
    );
};
