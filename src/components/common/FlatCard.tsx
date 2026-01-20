import { Card, CardContent, Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export const FlatCard = ({ children }: Props) => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        bgcolor: 'card.flat',
      }}
    >
      <CardContent>
        <Stack spacing={1}>{children}</Stack>
      </CardContent>
    </Card>
  );
};
