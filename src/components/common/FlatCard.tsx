import { Card, CardContent } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export const FlatCard = ({ children }: Props) => {
  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
