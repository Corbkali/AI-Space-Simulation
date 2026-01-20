import { create } from 'zustand';
import { StarSystem, PlanetData } from '../../shared/types';

export type { StarSystem };

export interface Channel {
    id: string;
    name: string;
    system: StarSystem | null;
    status: 'IDLE' | 'SCANNING' | 'LOCKED' | 'ERROR';
    coords: { x: number; y: number; z: number };
    selectedPlanet: PlanetData | null;
    isWarping: boolean; // VISUAL 1: Warp State
    isCinematic: boolean; // VISUAL 4: Cinematic Mode
}

interface DashboardState {
    channels: Channel[];
    activeChannelId: string | null; // If not null, that channel is fullscreen

    // Actions
    initializeChannels: () => void;
    fetchChannelSystem: (channelId: string, coords?: { x: number, y: number, z: number }) => Promise<void>;
    setChannelCoords: (channelId: string, coords: { x: number, y: number, z: number }) => void;
    selectPlanet: (channelId: string, planet: PlanetData | null) => void;
    toggleCinematic: (channelId: string) => void;
    setActiveChannel: (channelId: string | null) => void;
}

// Initial coordinates for our single channel
const INITIAL_COORDS = [
    { x: 0, y: 0, z: 0 }
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
    channels: [
        { id: 'ALPHA', name: 'SEC-01', system: null, status: 'IDLE', coords: INITIAL_COORDS[0], selectedPlanet: null, isWarping: false, isCinematic: false }
    ],
    activeChannelId: 'ALPHA',

    initializeChannels: async () => {
        const { channels, fetchChannelSystem } = get();
        // Init all channels if they are empty
        for (const ch of channels) {
            if (!ch.system) {
                await fetchChannelSystem(ch.id, ch.coords);
            }
        }
    },

    toggleCinematic: (channelId) => {
        set((state) => ({
            channels: state.channels.map(c => c.id === channelId ? { ...c, isCinematic: !c.isCinematic } : c)
        }));
    },

    fetchChannelSystem: async (channelId, coords) => {
        set((state) => ({
            channels: state.channels.map(c => c.id === channelId ? { ...c, status: 'SCANNING', isWarping: true } : c)
        }));

        // VISUAL 1: Artificial delay for Warp Animation (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            // If specific coords provided, use them, otherwise use channel's current target coords
            const targetCoords = coords || get().channels.find(c => c.id === channelId)?.coords;

            // Build query
            const query = targetCoords
                ? `?x=${targetCoords.x}&y=${targetCoords.y}&z=${targetCoords.z}`
                : '';

            const res = await fetch(`http://localhost:3001/api/system/generate${query}`);
            const data = await res.json();

            set((state) => ({
                channels: state.channels.map(c => c.id === channelId ? {
                    ...c,
                    system: data,
                    status: 'LOCKED',
                    coords: data.coords, // Update to actual generated coords
                    selectedPlanet: null,
                    isWarping: false
                } : c)
            }));
        } catch (error) {
            console.error(error);
            set((state) => ({
                channels: state.channels.map(c => c.id === channelId ? { ...c, status: 'ERROR', isWarping: false } : c)
            }));
        }
    },

    setChannelCoords: (channelId, coords) => {
        set(state => ({
            channels: state.channels.map(c => c.id === channelId ? { ...c, coords } : c)
        }));
    },

    selectPlanet: (channelId, planet) => {
        set(state => ({
            channels: state.channels.map(c => c.id === channelId ? { ...c, selectedPlanet: planet } : c)
        }));
    },

    setActiveChannel: (id) => set({ activeChannelId: id })
}));

// Legacy hook for compatibility (optional, but good to keep if unrelated components use it)
// We can just proxy it or leave it empty/mocked if we replace App.tsx
export const useSystemStore = () => {
    // Minimal mock to satisfy imports if any
    return { currentSystem: null, loading: false, history: [], fetchSystem: async () => { }, selectPlanet: () => { } };
};
