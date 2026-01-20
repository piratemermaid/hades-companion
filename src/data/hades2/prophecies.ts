import { ARCANA_CARDS } from './arcanaCards';
import { BOONS } from './boons';
import { WEAPONS } from './weapons';

const weaponList = WEAPONS.map((weapon) => weapon.name);
const arcanaCardList = ARCANA_CARDS.map((card) => card.name);

const duoBoonStringsArray = BOONS.find(
  (boon) => boon.name === 'Duo'
)?.boons.map(
  (boon: {
    name: string;
    boonsRequired?: Array<{ name: string; boons: string[] }>;
  }) => {
    if (!boon.boonsRequired) return boon.name;
    const requirements = boon.boonsRequired
      .map(
        (req: { name: string; boons: string[] }) =>
          `${req.name}: ${req.boons.join(', ')}`
      )
      .join(' | ');
    return `${boon.name} (${requirements})`;
  }
);

export const PROPHECIES = [
  {
    name: 'Defeat Typhon with Weapons',
    items: weaponList,
  },
  {
    name: 'Defeat Chronos with Weapons',
    items: weaponList,
  },
  {
    name: 'Defeat Chronos with Arcana Cards',
    items: arcanaCardList,
  },
  {
    name: 'Defeat Typhon with Arcana Cards',
    items: arcanaCardList,
  },
  { name: 'Hades Boons' },
  { name: 'Zeus Boons' },
  { name: 'Hera Boons' },
  { name: 'Poseidon Boons' },
  { name: 'Demeter Boons' },
  { name: 'Apollo Boons' },
  { name: 'Aphrodite Boons' },
  { name: 'Hephaestus Boons' },
  { name: 'Hestia Boons' },
  { name: 'Ares Boons' },
  { name: 'Artemis Boons' },
  { name: 'Hermes Boons' },
  { name: 'Athena Boons' },
  { name: 'Dionysus Boons' },
  { name: 'Chaos Curses' },
  { name: 'Duo Boons', items: duoBoonStringsArray },
];
