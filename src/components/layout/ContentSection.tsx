import { Stack, Typography } from '@mui/material';

type Props = {
  selectedTab: Tab;
  selectedGame: Game;
};

export const ContentSection = ({ selectedTab, selectedGame }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        {selectedTab} - {selectedGame}
      </Typography>
    </Stack>
  );
};
