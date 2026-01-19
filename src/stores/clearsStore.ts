import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Clear = {
  game: Game;
  weapon: string;
  aspect: string;
  clearType?: 'Tartarus' | 'Olympus'; // Only for hades2
  fearLevel: number;
};

type ClearsState = {
  clears: Clear[];
  addClear: (clear: Clear) => void;
  getClearsByGame: (game: Game) => Clear[];
};

export const useClearsStore = create<ClearsState>()(
  persist(
    (set, get) => ({
      clears: [],
      addClear: (clear) => {
        set((state) => ({
          clears: [...state.clears, clear],
        }));
      },
      getClearsByGame: (game) => {
        return get().clears.filter((clear) => clear.game === game);
      },
    }),
    {
      name: 'hades-companion-clears', // localStorage key
    }
  )
);
