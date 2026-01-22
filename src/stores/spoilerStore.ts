/// <reference types="../types" />
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SpoilerState = {
  revealedSpoilers: string[]; // Format: `${game}:${keepsakeName}`
  toggleSpoiler: (game: Game, keepsakeName: string) => void;
  isSpoilerRevealed: (game: Game, keepsakeName: string) => boolean;
};

export const useSpoilerStore = create<SpoilerState>()(
  persist(
    (set, get) => ({
      revealedSpoilers: [],

      toggleSpoiler: (game, keepsakeName) => {
        const key = `${game}:${keepsakeName}`;
        set((state) => {
          const index = state.revealedSpoilers.indexOf(key);
          if (index > -1) {
            return {
              revealedSpoilers: state.revealedSpoilers.filter(
                (k) => k !== key
              ),
            };
          } else {
            return {
              revealedSpoilers: [...state.revealedSpoilers, key],
            };
          }
        });
      },

      isSpoilerRevealed: (game, keepsakeName) => {
        const key = `${game}:${keepsakeName}`;
        return get().revealedSpoilers.includes(key);
      },
    }),
    {
      name: 'hades-companion-spoilers',
    }
  )
);
