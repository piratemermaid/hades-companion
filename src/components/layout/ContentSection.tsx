import { Stack } from '@mui/material';

import {
  ClearsSection,
  PropheciesSection,
  KeepsakesSection,
  RelationshipsSection,
  ItemsSection,
} from '@components/content';

type Props = {
  selectedTab: Tab;
  selectedGame: Game;
};

export const ContentSection = ({ selectedTab, selectedGame }: Props) => {
  const getContent = () => {
    switch (selectedTab) {
      case 'clears':
        return <ClearsSection selectedGame={selectedGame} />;
      case 'prophecies':
        return <PropheciesSection selectedGame={selectedGame} />;
      case 'keepsakes':
        return <KeepsakesSection selectedGame={selectedGame} />;
      case 'relationships':
        return <RelationshipsSection selectedGame={selectedGame} />;
      case 'items':
        return <ItemsSection />;
      default:
        return <div>No content</div>;
    }
  };

  return <Stack spacing={2}>{getContent()}</Stack>;
};
