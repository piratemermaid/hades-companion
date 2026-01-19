import { Stack } from '@mui/material';

import { NavigationButton } from '@components/navigation';

const TABS: { key: Tab; label: string }[] = [
  { key: 'clears', label: 'Clears' },
  { key: 'prophecies', label: 'Prophecies' },
  { key: 'keepsakes', label: 'Keepsakes' },
  { key: 'relationships', label: 'Relationships' },
  { key: 'items', label: 'Items' },
];

type Props = {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
  selectedGame: Game;
};

export const TabButtonSection = ({
  selectedTab,
  setSelectedTab,
  selectedGame,
}: Props) => {
  const isHades = selectedGame === 'hades';
  const tabs = isHades ? TABS.filter((tab) => tab.key !== 'items') : TABS;

  return (
    <Stack direction="row" spacing={2}>
      {tabs.map((tab) => (
        <NavigationButton
          key={tab.key}
          label={tab.label}
          onClick={() => setSelectedTab(tab.key)}
          selected={selectedTab === tab.key}
          type="tab"
        />
      ))}
    </Stack>
  );
};
