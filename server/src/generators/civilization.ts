import { v4 as uuidv4 } from 'uuid';

// --- AGENT-3: GENESIS DATA (Rick & Morty Style) ---
const SPECIES_TYPES = [
    'Sentient Gazorpazorpian', 'Cromulon', 'Bird-Person', 'Meeseeks-Based',
    'Gromflomite', 'Plutonian', 'Gear-Person', 'Liquid-Telepath', 'Cronenberg',
    'Mega-Seed Host', 'Schleem-Based', 'Amish Cyborg', 'Talking Cat'
];

const TRAITS = [
    'Existentially Dreadful', 'High-Anxiety Hive-Mind', 'Dimension-Hopping', 'Bureaucratic',
    'Portal-Obsessed', 'Szechuan Sauce-Addicted', 'Micro-Verse Creating', 'Parasitic',
    'Time-Fractured', 'Self-Destructive', 'Interdimensional', 'Jerry-Like'
];

// --- AGENT-4: SOCIO DATA ---
const GOVERNMENTS = [
    'Council of Ricks', 'Galactic Federation', 'Citadel of Ricks', 'Interdimensional Customs',
    'Shadow Council of Jerrys', 'Unity Hive Mind', 'Plutocratic Dictatorship', 'Anarcho-Rickism',
    'Theocracy of the Head', 'Abradolf Lincler Coalition'
];

const ETHICS = [
    'Nihilistic', 'Hedonistic', 'Authoritarian', 'Scientific Absolutist', 'Chaotic Neutral',
    'Bureaucratic Evil', 'Wholesome but Creepy', 'Toxic Masculinity'
];

// --- AGENT-6: LEXICON DATA ---
const SYLLABLES_A = ['glip', 'glop', 'rick', 'mort', 'squanch', 'xorp', 'bloog', 'schmeck', 'gaz', 'zorp'];
const SYLLABLES_B = ['-le', '-ba', '-do', '-zi', '-ron', '-la', '-qua', '-in', '-ex', '-os'];
const SYLLABLES_C = ['unity', 'prime', 'c-137', 'beta', 'zeta', 'alpha', 'delta'];

function generateName(type: string): string {
    let name = '';
    const flavor = Math.random();

    if (flavor < 0.3) {
        // Glip-Glop style
        name = SYLLABLES_A[Math.floor(Math.random() * SYLLABLES_A.length)] +
            SYLLABLES_A[Math.floor(Math.random() * SYLLABLES_A.length)] +
            SYLLABLES_B[Math.floor(Math.random() * SYLLABLES_B.length)];
    } else if (flavor < 0.6) {
        // Hyphenated Alien
        name = SYLLABLES_A[Math.floor(Math.random() * SYLLABLES_A.length)] + '-' +
            SYLLABLES_A[Math.floor(Math.random() * SYLLABLES_A.length)];
    } else {
        // Classic Sci-Fi Naming
        name = "Planet " + SYLLABLES_A[Math.floor(Math.random() * SYLLABLES_A.length)].toUpperCase() + "-" + Math.floor(Math.random() * 9000);
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const generateCivilization = () => {
    const type = SPECIES_TYPES[Math.floor(Math.random() * SPECIES_TYPES.length)];
    const speciesName = generateName(type);
    const civName = `${speciesName} ${['Empire', 'Dimension', 'Reality', 'Zone', 'Federation', 'Dominion'][Math.floor(Math.random() * 6)]}`;

    // Pick 1-3 traits
    const speciesTraits: string[] = [];
    const numTraits = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numTraits; i++) {
        const t = TRAITS[Math.floor(Math.random() * TRAITS.length)];
        if (!speciesTraits.includes(t)) speciesTraits.push(t);
    }

    // Pick Ethics
    const ethics: string[] = [];
    const numEthics = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numEthics; i++) {
        const e = ETHICS[Math.floor(Math.random() * ETHICS.length)];
        if (!ethics.includes(e)) ethics.push(e);
    }

    // Determine History / Description
    const description = `The ${speciesName} are a ${type.toLowerCase()} species known for being ${speciesTraits.join(' and ')}. They inhabit a ${ethics.join(', ')} society governed by a ${Math.random() > 0.5 ? 'strict' : 'benevolent'} ${GOVERNMENTS[Math.floor(Math.random() * GOVERNMENTS.length)]}.`;

    return {
        civ: {
            id: uuidv4(),
            name: civName,
            description,
            techLevel: (() => {
                const rand = Math.random();
                if (rand > 0.98) return Number((2.0 + Math.random()).toFixed(1)); // Type 2-3 (2%)
                if (rand > 0.85) return Number((1.2 + Math.random() * 0.8).toFixed(1)); // Type 1.2-2 (13%)
                return Number((0.5 + Math.random() * 0.7).toFixed(1)); // Type 0.5-1.2 (85%)
            })(),
            government: GOVERNMENTS[Math.floor(Math.random() * GOVERNMENTS.length)],
            ethics: JSON.stringify(ethics),
            historyLogs: JSON.stringify([`Civilization founded 2000 cycles ago.`]),
        },
        species: {
            id: uuidv4(),
            name: speciesName,
            type,
            traits: JSON.stringify(speciesTraits),
            description: `A ${type} species.`
        }
    };
};
