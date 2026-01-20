/// <reference types="../types" />
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RelationshipsState = {
  // Format: `${game}:${characterName}` -> number of hearts (0-10)
  heartProgress: Record<string, number>;
  // Format: `${game}:${characterName}` -> boolean
  favorites: string[];
  // Format: `${game}:${characterName}` -> max hearts for that character
  maxHearts: Record<string, number>;
  // Toggle favorite filter
  showFavoritesOnly: boolean;
  setHeartProgress: (game: Game, characterName: string, hearts: number) => void;
  toggleFavorite: (game: Game, characterName: string) => void;
  resetCharacter: (game: Game, characterName: string) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  setMaxHearts: (game: Game, characterName: string, max: number) => void;
  getTotalHearts: (game: Game) => number;
  getMaxTotalHearts: (game: Game) => number;
};

export const useRelationshipsStore = create<RelationshipsState>()(
  persist(
    (set, get) => ({
      heartProgress: {},
      favorites: [],
      maxHearts: {},
      showFavoritesOnly: false,

      setHeartProgress: (game, characterName, hearts) => {
        const key = `${game}:${characterName}`;
        set((state) => ({
          heartProgress: {
            ...state.heartProgress,
            [key]: Math.max(0, Math.min(hearts, state.maxHearts[key] || 10)),
          },
        }));
      },

      toggleFavorite: (game, characterName) => {
        const key = `${game}:${characterName}`;
        set((state) => {
          const index = state.favorites.indexOf(key);
          if (index > -1) {
            return {
              favorites: state.favorites.filter((f) => f !== key),
            };
          } else {
            return {
              favorites: [...state.favorites, key],
            };
          }
        });
      },

      resetCharacter: (game, characterName) => {
        const key = `${game}:${characterName}`;
        set((state) => {
          const newProgress = { ...state.heartProgress };
          delete newProgress[key];
          return { heartProgress: newProgress };
        });
      },

      setShowFavoritesOnly: (show) => {
        set({ showFavoritesOnly: show });
      },

      setMaxHearts: (game, characterName, max) => {
        const key = `${game}:${characterName}`;
        set((state) => ({
          maxHearts: {
            ...state.maxHearts,
            [key]: max,
          },
        }));
      },

      getTotalHearts: (game) => {
        const state = get();
        return Object.entries(state.heartProgress)
          .filter(([key]) => key.startsWith(`${game}:`))
          .reduce((sum, [, hearts]) => sum + hearts, 0);
      },

      getMaxTotalHearts: (game) => {
        const state = get();
        return Object.entries(state.maxHearts)
          .filter(([key]) => key.startsWith(`${game}:`))
          .reduce((sum, [, max]) => sum + max, 0);
      },
    }),
    {
      name: 'hades-companion-relationships',
    }
  )
);
