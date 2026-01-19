import { WEAPONS as HADES_WEAPONS } from '@data/hades';
import { WEAPONS as HADES2_WEAPONS } from '@data/hadesii';

export const getWeapons = (game: Game): Weapon[] => {
  switch (game) {
    case 'hades':
      return HADES_WEAPONS;
    case 'hades2':
      return HADES2_WEAPONS;
    default:
      return [];
  }
};
