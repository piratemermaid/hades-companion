/// <reference types="../types" />
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NavigationState = {
  selectedGame: Game;
  selectedTab: Tab;
  setSelectedGame: (game: Game) => void;
  setSelectedTab: (tab: Tab) => void;
};

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      selectedGame: 'hades',
      selectedTab: 'clears',
      setSelectedGame: (game) => set({ selectedGame: game }),
      setSelectedTab: (tab) => set({ selectedTab: tab }),
    }),
    {
      name: 'hades-companion-navigation',
    }
  )
);
