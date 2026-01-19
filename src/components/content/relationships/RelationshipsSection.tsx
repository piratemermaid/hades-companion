import { Stack, Typography } from '@mui/material';

type Props = {
  selectedGame: Game;
};

export const RelationshipsSection = ({ selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Relationships - {selectedGame}</Typography>
    </Stack>
  );
};
