import { StarSystem, PlanetData } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';
import { generateCivilization } from './generators/civilization';

const STAR_TYPES = ['f', 'g', 'k', 'm', 'a', 'b', 'o'] as const;
const STAR_COLORS: Record<string, string> = {
    o: '#9bb0ff',
    b: '#aabfff',
    a: '#cad7ff',
    f: '#f8f7ff',
    g: '#fff4ea',
    k: '#ffd2a1',
    m: '#ffcc6f'
};

const SYLLABLES = ['xor', 'lax', 'cri', 'ven', 'tar', 'lum', 'aeq', 'nos', 'ir', 'sol'];

function generateName(): string {
    const len = Math.floor(Math.random() * 2) + 2;
    let name = '';
    for (let i = 0; i < len; i++) {
        name += SYLLABLES[Math.floor(Math.random() * SYLLABLES.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const BIOMES = ['Volcanic', 'Barren', 'Desert', 'Tundra', 'Oceanic', 'Terran', 'Gas Giant'];
const RESOURCES = ['Iron', 'Copper', 'Gold', 'Titanium', 'Water', 'Lithium', 'Uranium'];

interface GenPlanetData extends PlanetData {
    _civ?: any;
    _species?: any;
}

export const generateSystem = (seed?: string, coords?: { x: number, y: number, z: number }): StarSystem => {
    // Simple random generator for now, real procedural generation would seed the RNG
    const name = generateName();

    // Determine coordinates if not provided
    let systemCoords = coords;
    let galacticCoords = { l: 0, b: 0, dist: 0 };

    if (!systemCoords) {
        // Realistic Galactic Generation
        // Distance from center (0 to 50,000 light years) - bias towards center
        const startDist = Math.random() * 50000;
        // Galactic Longitude (0-360)
        const l = Math.random() * 360;
        // Galactic Latitude (Usually flat disc, so bias towards 0, say -30 to 30 mostly)
        // using a gaussian-like distribution or simple power for 'b'
        const b = (Math.random() - 0.5) * 60; // +/- 30 degrees for thin disk? Or full sphere? specific user request "realness of our universe" implies disk usually.

        // Convert to Cartesian for 3D engine (X, Y, Z in Light Years)
        // x = r * cos(b) * cos(l)
        // y = r * cos(b) * sin(l) - usually Y is up in 3D, keeping Y as 'height' relative to disk plane? 
        // Let's use Y as 'up' (galactic plane thickness) -> Z is depth
        // Standard Physics: Z is up? In Three.js Y is up.
        // So:
        // x = r * cos(lat) * cos(lon)
        // z = r * cos(lat) * sin(lon)
        // y = r * sin(lat)

        const r = startDist;
        const radLat = (b * Math.PI) / 180;
        const radLon = (l * Math.PI) / 180;

        systemCoords = {
            x: r * Math.cos(radLat) * Math.cos(radLon),
            y: r * Math.sin(radLat),
            z: r * Math.cos(radLat) * Math.sin(radLon)
        };

        galacticCoords = { l, b, dist: r };
    }

    // 5% Chance for Black Hole
    // Helper to pick random star type excluding the last one (bh) which we handle manually or via chance
    let type: any = STAR_TYPES[Math.floor(Math.random() * (STAR_TYPES.length - 1))];

    // Force 'bh' if chance hits (using explicit cast to match StarSystem type)
    if (Math.random() < 0.05) {
        type = 'bh';
    }

    const numPlanets = type === 'bh' ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 8) + 1;
    const planets: GenPlanetData[] = [];
    let civData: any = null;
    let speciesData: any = null;

    for (let i = 0; i < numPlanets; i++) {
        // Generate planet data
        const distance = (type === 'bh' ? 20 : 10) + (i * 15) + (Math.random() * 5);
        const radius = type === 'bh' ? 0.2 + Math.random() : 0.5 + Math.random() * 2;

        // Simplistic biome logic based on distance
        let biome = 'Barren';
        let habitability = 0;

        if (distance < 30) biome = 'Volcanic';
        else if (distance > 100) biome = 'Tundra';
        else {
            const rand = Math.random();
            if (rand < 0.2) biome = 'Oceanic';
            else if (rand < 0.3) biome = 'Terran';
            else if (rand < 0.6) biome = 'Desert';
        }

        if (biome === 'Terran') habitability = 0.8 + Math.random() * 0.2;
        if (biome === 'Oceanic') habitability = 0.6 + Math.random() * 0.2;

        // Pick 0-3 random resources
        const planetResources: string[] = [];
        const numRes = Math.floor(Math.random() * 4);
        for (let r = 0; r < numRes; r++) {
            const res = RESOURCES[Math.floor(Math.random() * RESOURCES.length)];
            if (!planetResources.includes(res)) planetResources.push(res);
        }

        // --- AGENT-4 INTEGRATION: Chance for Civilization ---
        let planetCiv = null;
        let planetSpecies = null;
        if ((biome === 'Terran' || biome === 'Oceanic' || (biome === 'Desert' && Math.random() > 0.8)) && Math.random() < 0.5) {
            const gen = generateCivilization();
            planetCiv = gen.civ;
            planetSpecies = gen.species;
        }

        // --- VISUAL 5: The "Swarm" AI ---
        // 10% chance for a planet to be "Inhabited" by the glitched AI
        let anomaly = null;
        if (Math.random() < 0.1) {
            anomaly = 'AI_SWARM';
        }

        planets.push({
            id: uuidv4(),
            distance,
            radius,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
            orbitSpeed: 0.001 + (Math.random() * 0.005) / (i + 1),
            angle: Math.random() * Math.PI * 2,
            biome,
            resources: planetResources,
            habitability,
            anomaly, // Confusing visual agent 
            _civ: planetCiv,
            _species: planetSpecies
        });
    }

    return {
        seed: seed || uuidv4(),
        name,
        coords: systemCoords,
        galacticCoords: galacticCoords, // Added galacticCoords to the return object
        star: {
            radius: type === 'bh' ? 2 + Math.random() * 1 : 5 + Math.random() * 5,
            color: STAR_COLORS[type],
            type: type as any // Explicit cast to silence overlap errors if any persist
        },
        planets
    };
};
