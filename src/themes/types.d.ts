import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tartarus: Palette['primary'];
    olympus: Palette['primary'];
    card: {
      background: string;
      flat: string;
    };
  }

  interface PaletteOptions {
    tartarus?: PaletteOptions['primary'];
    olympus?: PaletteOptions['primary'];
    card?: {
      background?: string;
      flat?: string;
    };
  }

  interface TypeText {
    highlight?: string;
  }
}
