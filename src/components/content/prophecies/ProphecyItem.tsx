import { Checkbox, Stack, Typography } from '@mui/material';

import { usePropheciesStore } from '@stores';

type Props = {
  game: Game;
  prophecyName: string;
  item: string;
  allItems?: string[];
};

export const ProphecyItem = ({ game, prophecyName, item, allItems }: Props) => {
  const completedItems = usePropheciesStore((state) => state.completedItems);
  const toggleItem = usePropheciesStore((state) => state.toggleItem);

  const itemKey = `${game}:${prophecyName}:${item}`;
  const isCompleted = completedItems.includes(itemKey);

  const handleToggle = () => {
    toggleItem(game, prophecyName, item, allItems);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={1}
      sx={{
        bgcolor: 'card.background',
        borderRadius: 0.5,
        p: 0.75,
        '&:hover': { cursor: 'pointer' },
      }}
      onClick={handleToggle}
    >
      <Checkbox checked={isCompleted} size="small" sx={{ p: 0.25 }} />
      <Typography variant="body2" sx={{ opacity: isCompleted ? 0.5 : 1 }}>
        {item}
      </Typography>
    </Stack>
  );
};
