import { Stack, Typography } from '@mui/material';

import { KeepsakeItem } from './KeepsakeItem';
import { getKeepsakes } from '@data';

type Props = {
  selectedGame: Game;
};

export const KeepsakesSection = ({ selectedGame }: Props) => {
  const keepsakes = getKeepsakes(selectedGame).filter(
    (keepsake) => keepsake.description !== 'See Keepsakes from Olympians'
  );

  if (keepsakes.length === 0) {
    return (
      <Stack spacing={2}>
        <Typography variant="h6">Keepsakes</Typography>
        <Typography variant="body2" color="text.secondary">
          No keepsakes available for {selectedGame}.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      {keepsakes.map((keepsake) => (
        <KeepsakeItem
          key={keepsake.name}
          game={selectedGame}
          keepsake={keepsake}
        />
      ))}
    </Stack>
  );
};
