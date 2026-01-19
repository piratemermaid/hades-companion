import { Button } from '@mui/material';

type Props = {
  label: string;
  onClick: () => void;
  selected: boolean;
  type: 'game' | 'tab';
};

export const NavigationButton = ({ label, onClick, selected, type }: Props) => {
  const size = type === 'game' ? 'medium' : 'small';

  return (
    <Button
      variant="contained"
      color={selected ? 'primary' : 'inherit'}
      onClick={onClick}
      size={size}
    >
      {label}
    </Button>
  );
};
