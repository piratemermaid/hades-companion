import { Stack, Typography } from '@mui/material';

import { FlatCard } from '@components/common';
import { AddNewClearForm } from '@components/content/clears';

type Props = {
  selectedGame: Game;
};

export const ClearsSection = ({ selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <FlatCard>
        <Typography variant="h6">Add New Clear</Typography>
        <AddNewClearForm key={selectedGame} selectedGame={selectedGame} />
      </FlatCard>
    </Stack>
  );
};
