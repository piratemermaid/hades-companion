import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  clearType: 'Tartarus' | 'Olympus';
};

export const ClearTypeBadge = ({ clearType }: Props) => {
  const theme = useTheme();

  const paletteColor = clearType === 'Tartarus' ? 'tartarus' : 'olympus';

  return (
    <Box
      sx={{
        bgcolor: theme.palette[paletteColor].main,
        borderRadius: '4px',
        px: 1.5,
        py: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: 700,
          color: theme.palette[paletteColor].light,
        }}
      >
        {clearType}
      </Typography>
    </Box>
  );
};
