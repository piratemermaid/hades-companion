/// <reference types="../types" />
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PropheciesState = {
  completedProphecies: string[]; // Format: `${game}:${prophecyName}`
  completedItems: string[]; // Format: `${game}:${prophecyName}:${itemName}`
  toggleProphecy: (game: Game, prophecyName: string, items?: string[]) => void;
  toggleItem: (game: Game, prophecyName: string, itemName: string, allItems?: string[]) => void;
  isProphecyCompleted: (game: Game, prophecyName: string) => boolean;
  isItemCompleted: (game: Game, prophecyName: string, itemName: string) => boolean;
};

export const usePropheciesStore = create<PropheciesState>()(
  persist(
    (set, get) => ({
      completedProphecies: [],
      completedItems: [],

      toggleProphecy: (game, prophecyName, items) => {
        const key = `${game}:${prophecyName}`;
        set((state) => {
          const index = state.completedProphecies.indexOf(key);
          const isCurrentlyCompleted = index > -1;
          
          // If prophecy has items, toggle all items as well
          if (items && items.length > 0) {
            const newCompletedItems = [...state.completedItems];
            
            if (isCurrentlyCompleted) {
              // Unchecking prophecy: remove all items
              items.forEach((item) => {
                const itemKey = `${key}:${item}`;
                const itemIndex = newCompletedItems.indexOf(itemKey);
                if (itemIndex > -1) {
                  newCompletedItems.splice(itemIndex, 1);
                }
              });
            } else {
              // Checking prophecy: add all items
              items.forEach((item) => {
                const itemKey = `${key}:${item}`;
                if (!newCompletedItems.includes(itemKey)) {
                  newCompletedItems.push(itemKey);
                }
              });
            }
            
            return {
              completedProphecies: isCurrentlyCompleted
                ? state.completedProphecies.filter((k) => k !== key)
                : [...state.completedProphecies, key],
              completedItems: newCompletedItems,
            };
          } else {
            // No items, just toggle the prophecy
            return {
              completedProphecies: isCurrentlyCompleted
                ? state.completedProphecies.filter((k) => k !== key)
                : [...state.completedProphecies, key],
            };
          }
        });
      },

      toggleItem: (game, prophecyName, itemName, allItems) => {
        const itemKey = `${game}:${prophecyName}:${itemName}`;
        const prophecyKey = `${game}:${prophecyName}`;
        
        set((state) => {
          const index = state.completedItems.indexOf(itemKey);
          const isCurrentlyCompleted = index > -1;
          
          // Toggle the item
          const newCompletedItems = isCurrentlyCompleted
            ? state.completedItems.filter((k) => k !== itemKey)
            : [...state.completedItems, itemKey];
          
          // If we have all items, check if all are now completed
          if (allItems && allItems.length > 0) {
            const allItemsCompleted = allItems.every((item) =>
              newCompletedItems.includes(`${prophecyKey}:${item}`)
            );
            const prophecyIsCompleted = state.completedProphecies.includes(prophecyKey);
            
            if (allItemsCompleted && !prophecyIsCompleted) {
              // All items completed, mark prophecy as completed
              return {
                completedItems: newCompletedItems,
                completedProphecies: [...state.completedProphecies, prophecyKey],
              };
            } else if (!allItemsCompleted && prophecyIsCompleted) {
              // Not all items completed, unmark prophecy
              return {
                completedItems: newCompletedItems,
                completedProphecies: state.completedProphecies.filter((k) => k !== prophecyKey),
              };
            }
          }
          
          return {
            completedItems: newCompletedItems,
          };
        });
      },

      isProphecyCompleted: (game, prophecyName) => {
        const key = `${game}:${prophecyName}`;
        return get().completedProphecies.includes(key);
      },

      isItemCompleted: (game, prophecyName, itemName) => {
        const key = `${game}:${prophecyName}:${itemName}`;
        return get().completedItems.includes(key);
      },
    }),
    {
      name: 'hades-companion-prophecies',
    }
  )
);
