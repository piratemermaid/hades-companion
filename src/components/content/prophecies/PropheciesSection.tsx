import { Stack, Typography } from '@mui/material';

type Props = {
  selectedGame: Game;
};

export const PropheciesSection = ({ selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Prophecies - {selectedGame}</Typography>
    </Stack>
  );
};
