import { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';

import { useClearsStore, type Clear } from '@stores';
import { countClearsByType, groupClearsByAspect } from './utils/clearUtils';
import { WeaponHeader } from './WeaponHeader';
import { AspectSection } from './AspectSection';
import { FlatCard } from '@components/common';

type Props = {
  weapon: Weapon;
  weaponClears: Clear[];
  selectedGame: Game;
};

export const WeaponClearsSection = ({
  weapon,
  weaponClears,
  selectedGame,
}: Props) => {
  const { removeClear } = useClearsStore();

  const isHades2 = selectedGame === 'hades2';

  const clearCounts = useMemo(() => {
    if (!isHades2) return null;
    return countClearsByType(weaponClears);
  }, [weaponClears, isHades2]);

  const clearsByAspect = useMemo(
    () => groupClearsByAspect(weaponClears, isHades2),
    [weaponClears, isHades2]
  );

  const handleDelete = (clear: Clear) => {
    removeClear(clear);
  };

  return (
    <FlatCard>
      <Stack spacing={1}>
        <WeaponHeader
          weaponName={weapon.name}
          clearCount={weaponClears.length}
          clearCounts={clearCounts}
          isHades2={isHades2}
        />

        {weaponClears.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            No clears recorded
          </Typography>
        )}

        {Object.entries(clearsByAspect).map(([aspect, clears]) => (
          <AspectSection
            key={aspect}
            aspect={aspect}
            clears={clears}
            isHades2={isHades2}
            onDelete={handleDelete}
          />
        ))}
      </Stack>
    </FlatCard>
  );
};
