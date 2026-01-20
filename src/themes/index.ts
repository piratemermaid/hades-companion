import { createTheme, lighten } from '@mui/material';
import { grey, purple, red } from '@mui/material/colors';
// @ts-expect-error - fontsource is not typed
import '@fontsource/alegreya-sans';

const palette = {
  primary: red[800],
  secondary: purple[500],
  background: grey[900],
  disabled: grey[500],
  tartarus: '#5a168b',
  olympus: '#1c398e',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    background: {
      default: palette.background,
    },
    action: {
      disabled: palette.disabled,
    },
    text: {
      primary: grey[50],
      secondary: grey[500],
      highlight: lighten(palette.primary, 0.3),
    },
    tartarus: {
      main: palette.tartarus,
      light: lighten(palette.tartarus, 0.8),
    },
    olympus: {
      main: palette.olympus,
      light: lighten(palette.olympus, 0.8),
    },
    card: {
      background: grey[900],
      flat: '#1a1a1a',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Alegreya Sans, sans-serif',
      letterSpacing: '0.05em',
    },
    button: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
