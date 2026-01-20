import {
  WEAPONS as HADES_WEAPONS,
  PROPHECIES as HADES_PROPHECIES,
} from '@data/hades';
import {
  WEAPONS as HADES2_WEAPONS,
  PROPHECIES as HADES2_PROPHECIES,
} from '@data/hades2';

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

export const getProphecies = (game: Game): Prophecy[] => {
  switch (game) {
    case 'hades':
      return HADES_PROPHECIES;
    case 'hades2':
      return HADES2_PROPHECIES;
    default:
      return [];
  }
};
