/// <reference types="../types" />
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type KeepsakesState = {
  completedKeepsakes: string[]; // Format: `${game}:${keepsakeName}`
  toggleKeepsake: (game: Game, keepsakeName: string) => void;
  isKeepsakeCompleted: (game: Game, keepsakeName: string) => boolean;
};

export const useKeepsakesStore = create<KeepsakesState>()(
  persist(
    (set, get) => ({
      completedKeepsakes: [],

      toggleKeepsake: (game, keepsakeName) => {
        const key = `${game}:${keepsakeName}`;
        set((state) => {
          const index = state.completedKeepsakes.indexOf(key);
          if (index > -1) {
            return {
              completedKeepsakes: state.completedKeepsakes.filter(
                (k) => k !== key
              ),
            };
          } else {
            return {
              completedKeepsakes: [...state.completedKeepsakes, key],
            };
          }
        });
      },

      isKeepsakeCompleted: (game, keepsakeName) => {
        const key = `${game}:${keepsakeName}`;
        return get().completedKeepsakes.includes(key);
      },
    }),
    {
      name: 'hades-companion-keepsakes',
    }
  )
);
