import { Stack, Typography } from '@mui/material';

type Props = {
  selectedGame: Game;
};

export const KeepsakesSection = ({ selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Keepsakes - {selectedGame}</Typography>
    </Stack>
  );
};
