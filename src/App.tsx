import { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import {
  ContentSection,
  GameButtonSection,
  TabButtonSection,
} from '@components/layout';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game>('hades');
  const [selectedTab, setSelectedTab] = useState<Tab>('clears');

  return (
    <Stack spacing={2} alignItems="center">
      <Typography
        component="h1"
        variant="h6"
        color="text.secondary"
        sx={{ fontWeight: 600 }}
      >
        Hades Progress Tracker
      </Typography>

      <GameButtonSection
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />

      <TabButtonSection
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        selectedGame={selectedGame}
      />

      <ContentSection selectedGame={selectedGame} selectedTab={selectedTab} />
    </Stack>
  );
}

export default App;
