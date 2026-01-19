import { Stack, Typography } from '@mui/material';

type Props = {
  selectedGame: Game;
};

export const ClearsSection = ({ selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Clears - {selectedGame}</Typography>
    </Stack>
  );
};
