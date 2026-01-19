import { Stack } from '@mui/material';

import { NavigationButton } from '@components/navigation';

type Props = {
  selectedGame: Game;
  setSelectedGame: (game: Game) => void;
};

export const GameButtonSection = ({ selectedGame, setSelectedGame }: Props) => {
  return (
    <Stack direction="row" spacing={2}>
      <NavigationButton
        label="Hades"
        onClick={() => setSelectedGame('hades')}
        selected={selectedGame === 'hades'}
        type="game"
      />
      <NavigationButton
        label="Hades II"
        onClick={() => setSelectedGame('hades2')}
        selected={selectedGame === 'hades2'}
        type="game"
      />
    </Stack>
  );
};
