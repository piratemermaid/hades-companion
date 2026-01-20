import { Stack, Typography } from '@mui/material';
import { Checkbox } from '@mui/material';

import { usePropheciesStore } from '@stores';

type Props = {
  game: Game;
  prophecyName: string;
  items?: string[];
};

export const ProphecyAccordionTitle = ({
  game,
  prophecyName,
  items,
}: Props) => {
  const completedItems = usePropheciesStore((state) => state.completedItems);
  const completedProphecies = usePropheciesStore(
    (state) => state.completedProphecies
  );
  const toggleProphecy = usePropheciesStore((state) => state.toggleProphecy);

  const prophecyKey = `${game}:${prophecyName}`;
  const isCompleted = completedProphecies.includes(prophecyKey);

  const completedItemsCount =
    items?.filter((item) => completedItems.includes(`${prophecyKey}:${item}`))
      .length || 0;
  const totalItems = items?.length || 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{ width: '100%' }}
    >
      <Checkbox
        checked={isCompleted}
        onChange={(e) => {
          e.stopPropagation();
          toggleProphecy(game, prophecyName, items);
        }}
        onClick={(e) => e.stopPropagation()}
        size="small"
        sx={{ p: 0.25 }}
      />
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ opacity: isCompleted ? 0.6 : 1, fontSize: '0.875rem' }}
      >
        {prophecyName}
      </Typography>
      {items && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.75rem' }}
        >
          {completedItemsCount} / {totalItems} completed
        </Typography>
      )}
    </Stack>
  );
};
