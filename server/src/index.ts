import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Nebula Navigator API Online');
});

import { generateSystem } from './generator';
import prisma from './db';

app.get('/api/system/generate', async (req, res) => {
    try {
        const x = req.query.x ? parseFloat(req.query.x as string) : undefined;
        const y = req.query.y ? parseFloat(req.query.y as string) : undefined;
        const z = req.query.z ? parseFloat(req.query.z as string) : undefined;

        const coords = (x !== undefined && y !== undefined && z !== undefined) ? { x, y, z } : undefined;

        const result = generateSystem(undefined, coords);

        // Save to DB
        const savedSystem = await prisma.system.create({
            data: {
                seed: result.seed,
                name: result.name,
                starType: result.star.type,
                starColor: result.star.color,
                starRadius: result.star.radius,
                x: result.coords.x,
                y: result.coords.y,
                z: result.coords.z,
                planets: {
                    create: result.planets.map((p: any) => {
                        let civQuery: any = undefined;
                        if (p._civ && p._species) {
                            civQuery = {
                                create: {
                                    name: p._civ.name,
                                    description: p._civ.description,
                                    techLevel: p._civ.techLevel,
                                    government: p._civ.government,
                                    ethics: p._civ.ethics,
                                    historyLogs: p._civ.historyLogs,
                                    species: {
                                        create: {
                                            name: p._species.name,
                                            type: p._species.type,
                                            traits: p._species.traits,
                                            description: p._species.description
                                        }
                                    }
                                }
                            };
                        }

                        // Remove temp fields for clean object
                        // const { _civ, _species, ...cleanPlanet } = p; // Not strictly necessary as we select fields below

                        return {
                            distance: p.distance,
                            radius: p.radius,
                            color: p.color,
                            orbitSpeed: p.orbitSpeed,
                            angle: p.angle,
                            biome: p.biome,
                            resources: JSON.stringify(p.resources),
                            habitability: p.habitability,
                            civilization: civQuery
                        };
                    })
                }
            },
            include: {
                planets: true
            }
        });

        res.json(result);
    } catch (e) {
        console.error("Failed to save system", e);
        res.status(500).json({ error: "System generation failed" });
    }
});

app.get('/api/systems/history', async (req, res) => {
    try {
        const systems = await prisma.system.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { planets: true }
        });

        // Map back to shared type format
        const formatted = systems.map(s => ({
            seed: s.seed,
            name: s.name,
            star: {
                radius: s.starRadius,
                color: s.starColor,
                type: s.starType
            },
            planets: s.planets.map(p => ({
                id: p.id,
                distance: p.distance,
                radius: p.radius,
                color: p.color,
                orbitSpeed: p.orbitSpeed,
                angle: p.angle,
                biome: p.biome,
                resources: JSON.parse(p.resources),
                habitability: p.habitability
            }))
        }));

        res.json(formatted);
    } catch (e) {
        console.error("Failed to fetch history", e);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
