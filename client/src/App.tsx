import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDashboardStore, Channel, StarSystem } from './store';
import { SystemScene } from './scene/SystemScene';

// Galactic Minimap Component
const GalacticMinimap = ({ channel }: { channel: Channel }) => {
    // Galactic scale: 50,000 ly radius
    const gal = channel.system?.galacticCoords || { l: 0, b: 0, dist: 0 };

    // Polar to Cartesian for map (0,0 is center)
    const mapRadius = 40;
    const maxDist = 50000;

    const rad = (gal.l * Math.PI) / 180;
    const r = (gal.dist / maxDist) * mapRadius;
    const x = r * Math.cos(rad);
    const y = r * -Math.sin(rad);

    return (
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '90px', height: '90px', pointerEvents: 'auto' }}>
            <div style={{
                width: '100%', height: '100%',
                borderRadius: '50%',
                border: '1px solid #005544',
                background: 'rgba(0,0,0,0.8)',
                position: 'relative',
                boxShadow: '0 0 10px rgba(0, 255, 200, 0.1) inset'
            }}>
                {/* Galactic Center */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 5px white' }}></div>

                {/* User Position */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '6px', height: '6px',
                    background: '#00ffcc',
                    borderRadius: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    boxShadow: '0 0 4px #00ffcc'
                }}></div>
                <div style={{ position: 'absolute', bottom: '-15px', width: '100%', textAlign: 'center', fontSize: '8px', color: '#555' }}>width: 100k LY</div>
            </div>
        </div>
    );
};

// Radio Signals Component
const RadioLog = ({ system }: { system: StarSystem | null }) => {
    const hasLife = system?.planets.some(p => p.civilization);
    const hasAnomaly = system?.planets.some(p => p.anomaly === 'AI_SWARM');

    // Choose which signal to show (Anomaly takes precedence)
    if (!hasLife && !hasAnomaly) return null;

    const civ = system?.planets.find(p => p.civilization)?.civilization;

    if (hasAnomaly) {
        return (
            <div style={{
                position: 'absolute', bottom: '150px', left: '20px',
                width: '300px',
                background: 'rgba(20, 0, 20, 0.9)',
                borderLeft: '4px solid #ff00ff',
                padding: '15px',
                fontFamily: 'monospace',
                color: '#ff00ff',
                pointerEvents: 'none',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
                animation: 'pulse 0.5s infinite'
            }}>
                <style>{`
                    @keyframes pulse {
                        0% { opacity: 0.9; transform: translateX(0); }
                        25% { opacity: 0.8; transform: translateX(2px); }
                        50% { opacity: 0.9; transform: translateX(-2px); }
                        75% { opacity: 1; transform: translateX(1px); }
                        100% { opacity: 0.9; transform: translateX(0); }
                    }
                `}</style>
                <div style={{ borderBottom: '1px solid #ff00ff', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', letterSpacing: '4px' }}>⚠ WARNING: ANOMALY ⚠</div>
                <div style={{ opacity: 0.9, fontSize: '12px', lineHeight: '1.4', textShadow: '0 0 5px #ff00ff' }}>
                    <strong>ENTITY:</strong> UNKNOWN_SWARM_AI<br />
                    <strong>STATUS:</strong> MIMETIC HAZARD DETECTED<br />
                    <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#ffccff', border: '1px dashed #ff00ff', padding: '5px' }}>
                        "DO NOT LOOK. DO NOT LISTEN. THE GEOMETRY IS WRONG. IT WANTS TO BE SEEN."
                    </div>
                </div>
            </div>
        );
    }

    // Normal Civ logic...
    return (
        <div style={{
            position: 'absolute', bottom: '150px', left: '20px',
            width: '250px',
            background: 'rgba(0, 20, 10, 0.95)',
            borderLeft: '4px solid #00ff00',
            padding: '10px',
            fontFamily: 'monospace',
            color: '#00ff00',
            pointerEvents: 'none',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)'
        }}>
            <div style={{ borderBottom: '1px solid #004400', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>SIGNAL INTERCEPTED</div>
            <div style={{ opacity: 0.9, fontSize: '11px', lineHeight: '1.4' }}>
                <strong>SOURCE:</strong> {civ?.name}<br />
                <strong>FREQ:</strong> {Math.random().toFixed(2)} THz<br />
                <div style={{ marginTop: '5px', fontStyle: 'italic', color: '#ccffcc' }}>
                    "Greetings from the {civ?.species.name}. We are a {civ?.techLevel ? 'Level ' + civ.techLevel : ''} civilization."
                </div>
            </div>
        </div>
    );
};

// HUD Component
const ViewportHUD = ({ channel, onJump, onCinematicToggle }: { channel: Channel, onJump: () => void, onCinematicToggle: () => void }) => {
    // Warp Overlay
    if (channel.isWarping) {
        return (
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)', pointerEvents: 'none'
            }}>
                <div style={{ color: 'cyan', fontSize: '48px', letterSpacing: '20px', textShadow: '0 0 20px cyan', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    WARP ENGAGED
                </div>
            </div>
        );
    }

    // Cinematic Mode (Hide HUD)
    if (channel.isCinematic) {
        return (
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', pointerEvents: 'auto' }}>
                <button onClick={onCinematicToggle} style={{
                    background: 'rgba(0,0,0,0.5)', color: '#555',
                    border: '1px solid #333', cursor: 'pointer',
                    fontSize: '10px', padding: '5px 10px', letterSpacing: '1px'
                }}>
                    EXIT CINEMATIC
                </button>
            </div>
        );
    }

    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none',
            padding: '20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '10px 20px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '24px', borderLeft: '4px solid #00ffcc', fontWeight: 'bold' }}>
                        OBSERVATORY
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={onJump} style={{
                            background: '#003333', color: '#00ffcc',
                            border: '1px solid #00ffcc', cursor: 'pointer',
                            fontSize: '14px', padding: '8px 20px',
                            textTransform: 'uppercase', letterSpacing: '2px',
                            boxShadow: '0 0 15px rgba(0,255,200,0.2)'
                        }}>
                            INITIATE HYPERJUMP
                        </button>
                        <button onClick={onCinematicToggle} style={{
                            background: '#331100', color: '#ff9900',
                            border: '1px solid #ff9900', cursor: 'pointer',
                            fontSize: '14px', padding: '8px 20px',
                            textTransform: 'uppercase', letterSpacing: '2px',
                        }}>
                            CINEMATIC MODE
                        </button>
                    </div>
                </div>

                {/* Galactic Coordinates Panel + Minimap */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '10px', pointerEvents: 'auto', border: '1px solid #004433', minWidth: '150px' }}>
                        <div style={{ color: '#00ffcc', fontSize: '10px', textTransform: 'uppercase', borderBottom: '1px solid #004433', marginBottom: '5px', paddingBottom: '2px' }}>Galactic Coordinates</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontFamily: 'monospace', fontSize: '14px' }}>
                            <span>L:</span> <span style={{ color: 'cyan' }}>{channel.system?.galacticCoords?.l.toFixed(2)}°</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontFamily: 'monospace', fontSize: '14px' }}>
                            <span>B:</span> <span style={{ color: 'cyan' }}>{channel.system?.galacticCoords?.b.toFixed(2)}°</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontFamily: 'monospace', fontSize: '14px' }}>
                            <span>DIST:</span> <span style={{ color: 'orange' }}>{channel.system?.galacticCoords?.dist.toFixed(0)} ly</span>
                        </div>
                    </div>
                    <GalacticMinimap channel={channel} />
                </div>
            </div>

            <RadioLog system={channel.system} />

            {/* Bottom Bar: System Info */}
            {channel.system && (
                <div style={{ pointerEvents: 'auto', alignSelf: 'center', marginBottom: '20px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '15px 30px', borderBottom: '4px solid #ff9900', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '32px', letterSpacing: '2px' }}>{channel.system.name.toUpperCase()}</div>
                        <div style={{ fontSize: '14px', color: '#aaa', letterSpacing: '1px' }}>
                            <span style={{ color: channel.system.star.type === 'bh' ? '#a020f0' : '#ffff00' }}>{channel.system.star.type === 'bh' ? 'SINGULARITY' : channel.system.star.type.toUpperCase() + '-CLASS STAR'}</span>
                            <span style={{ margin: '0 10px' }}>|</span>
                            {channel.system.planets.length} ORBITAL BODIES
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Planet Inspector (Detailed) */}
            {channel.selectedPlanet && (
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '350px', background: 'rgba(5, 10, 15, 0.95)', border: '1px solid #00ffcc', padding: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 30px rgba(0, 255, 200, 0.15)' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span style={{ color: channel.selectedPlanet.habitability > 0.5 ? '#00ff00' : '#ccc', fontWeight: 'bold', fontSize: '20px' }}>
                            {channel.selectedPlanet.biome.toUpperCase()}
                        </span>
                        <span style={{ color: '#555', fontSize: '12px' }}>CLASS-{channel.selectedPlanet.radius > 2 ? 'J' : 'M'}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
                        <div style={{ border: '1px solid #222', padding: '5px' }}>HABITABILITY<br /><span style={{ color: 'white', fontSize: '14px' }}>{(channel.selectedPlanet.habitability * 100).toFixed(1)}%</span></div>
                        <div style={{ border: '1px solid #222', padding: '5px' }}>RESOURCES<br /><span style={{ color: 'white', fontSize: '14px' }}>{channel.selectedPlanet.resources.length} Types</span></div>
                    </div>

                    {channel.selectedPlanet.civilization ? (
                        <div style={{ background: 'rgba(255, 100, 0, 0.1)', border: '1px solid #ff5500', padding: '15px' }}>
                            <div style={{ color: '#ff5500', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px', fontWeight: 'bold' }}>⚠ DETECTED CIVILIZATION</div>
                            <h3 style={{ margin: '0 0 5px 0', color: '#ffaa00', fontSize: '18px' }}>{channel.selectedPlanet.civilization.species.name}</h3>
                            <div style={{ fontSize: '12px', color: '#ccc', fontStyle: 'italic', lineHeight: '1.5' }}>
                                "{channel.selectedPlanet.civilization.description}"
                            </div>
                            <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                                <span style={{ background: '#331100', color: '#ff9900', padding: '2px 6px', fontSize: '10px' }}>T{channel.selectedPlanet.civilization.techLevel}</span>
                                <span style={{ background: '#331100', color: '#ff9900', padding: '2px 6px', fontSize: '10px' }}>{channel.selectedPlanet.civilization.government}</span>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '15px', border: '1px dashed #333', color: '#555', fontSize: '12px' }}>
                            NO SENTIENT LIFE DETECTED
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


function App() {
    const { channels, initializeChannels, fetchChannelSystem, toggleCinematic, selectPlanet } = useDashboardStore();

    // Single Screen mode: Use only the first channel
    const activeChannel = channels[0];

    useEffect(() => {
        // Only initialize if not already done
        if (!activeChannel.system) { // only check our primary channel
            initializeChannels();
        }
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
            <div key={activeChannel.id} style={{ position: 'relative', width: '100%', height: '100%', background: '#020205' }}>

                {/* Viewport Canvas */}
                <div style={{ width: '100%', height: '100%' }}>
                    <Canvas camera={{ position: [0, 50, 50], fov: 45 }}> {/* Increased FOV for cinematic feel */}
                        {activeChannel.system && (
                            <SystemScene
                                system={activeChannel.system}
                                selectedPlanetId={activeChannel.selectedPlanet?.id || null}
                                onSelectPlanet={(p) => selectPlanet(activeChannel.id, p)}
                                isWarping={activeChannel.isWarping}
                            />
                        )}
                    </Canvas>
                </div>

                {/* HUD Overlay */}
                <ViewportHUD
                    channel={activeChannel}
                    onJump={() => fetchChannelSystem(activeChannel.id)}
                    onCinematicToggle={() => toggleCinematic(activeChannel.id)}
                />

            </div>
        </div>
    );
}

export default App;
