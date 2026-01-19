import { createTheme } from "@mui/material";
import { grey, purple, red } from "@mui/material/colors";
import { lighten } from "@mui/material/styles";
// @ts-expect-error - fontsource is not typed
import '@fontsource/alegreya-sans';

const palette = {
    primary: red[800],
    secondary: purple[500],
    background: grey[900],
    text: grey[50],
    disabled: grey[500],
};

export const theme = createTheme({
    palette: {
        mode: "dark",
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
            secondary: lighten(palette.primary, 0.3)
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'Alegreya Sans, sans-serif',
            color: palette.text,
            letterSpacing: '0.05em',

        },
        button: {
            fontSize: '1rem',
        }
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