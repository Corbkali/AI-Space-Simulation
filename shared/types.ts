
export interface PlanetData {
    id: string;
    distance: number; // AU or arbitrary units
    radius: number;
    color: string;
    orbitSpeed: number;
    angle: number; // Initial orbit angle
    biome: string;
    resources: string[];
    habitability: number;
    civilization?: CivilizationData;
    anomaly?: 'AI_SWARM' | null;
}

export interface CivilizationData {
    id: string;
    name: string;
    description: string;
    techLevel: number;
    government: string;
    ethics: string[];
    species: SpeciesData;
}

export interface SpeciesData {
    name: string;
    type: string;
    traits: string[];
    description: string;
}

export interface StarSystem {
    seed: string;
    name: string;
    coords: { x: number; y: number; z: number }; // Universal coordinates
    galacticCoords?: { l: number; b: number; dist: number }; // Galactic Coordinates
    star: {
        radius: number;
        color: string;
        type: 'f' | 'g' | 'k' | 'm' | 'a' | 'b' | 'o' | 'bh'; // bh = Black Hole
    };
    planets: PlanetData[];
}
