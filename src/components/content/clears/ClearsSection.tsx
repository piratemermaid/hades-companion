import { Stack, Typography } from '@mui/material';

import { FlatCard } from '@components/common';
import {
  AddNewClearForm,
  WeaponClearsSection,
} from '@components/content/clears';
import { getWeapons } from '@data/getters';
import { useClearsStore } from '@stores';

type Props = {
  selectedGame: Game;
};

export const ClearsSection = ({ selectedGame }: Props) => {
  const weapons = getWeapons(selectedGame);

  const clears = useClearsStore().getClearsByGame(selectedGame);

  return (
    <Stack spacing={2}>
      <FlatCard>
        <Typography variant="h6">Add New Clear</Typography>
        <AddNewClearForm key={selectedGame} selectedGame={selectedGame} />
      </FlatCard>

      {weapons.map((weapon) => (
        <WeaponClearsSection
          key={weapon.name}
          weapon={weapon}
          weaponClears={clears.filter((clear) => clear.weapon === weapon.name)}
          selectedGame={selectedGame}
        />
      ))}
    </Stack>
  );
};
