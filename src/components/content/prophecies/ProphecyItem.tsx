import { Stack, Typography } from '@mui/material';

type Props = {
  item: string;
};

export const ProphecyItem = ({ item }: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ bgcolor: 'card.background', borderRadius: 0.5, p: 1 }}
    >
      <Typography variant="body2">{item}</Typography>
    </Stack>
  );
};
