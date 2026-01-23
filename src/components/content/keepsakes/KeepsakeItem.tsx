import { Checkbox, Stack, Typography } from '@mui/material';

import { useKeepsakesStore } from '@stores';
import { Spoiler } from '@components/common';

type Props = {
  game: Game;
  keepsake: Keepsake;
};

export const KeepsakeItem = ({ game, keepsake }: Props) => {
  const completedKeepsakes = useKeepsakesStore(
    (state) => state.completedKeepsakes
  );
  const toggleKeepsake = useKeepsakesStore((state) => state.toggleKeepsake);

  const keepsakeKey = `${game}:${keepsake.name}`;
  const isCompleted = completedKeepsakes.includes(keepsakeKey);
  const isSpoiler = keepsake.isSpoiler === true;

  const handleToggle = () => {
    toggleKeepsake(game, keepsake.name);
  };

  const content = (
    <Stack direction="column" spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography
          variant="body2"
          sx={{ opacity: isCompleted ? 0.5 : 1, fontWeight: 500 }}
        >
          {keepsake.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.75rem' }}
        >
          ({keepsake.from})
        </Typography>
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontSize: '0.75rem',
          opacity: isCompleted ? 0.4 : 0.7,
        }}
      >
        {keepsake.description}
      </Typography>
    </Stack>
  );

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1}
      sx={{
        bgcolor: 'card.background',
        borderRadius: 0.5,
        p: 0.75,
        '&:hover': { cursor: 'pointer' },
      }}
      onClick={handleToggle}
    >
      <Checkbox checked={isCompleted} size="small" sx={{ p: 0.25, mt: 0.25 }} />
      {isSpoiler ? (
        <Spoiler game={game} itemName={keepsake.name}>
          {content}
        </Spoiler>
      ) : (
        content
      )}
    </Stack>
  );
};
