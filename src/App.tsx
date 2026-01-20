import { Stack, Typography } from '@mui/material';

import {
  ContentSection,
  GameButtonSection,
  TabButtonSection,
} from '@components/layout';
import { useNavigationStore } from '@stores';

function App() {
  const { selectedGame, selectedTab, setSelectedGame, setSelectedTab } =
    useNavigationStore();

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
