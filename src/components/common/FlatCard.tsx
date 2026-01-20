import { Card, CardContent } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export const FlatCard = ({ children }: Props) => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        bgcolor: 'card.flat',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
