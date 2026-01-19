import { createTheme } from "@mui/material";
import { grey, purple, red } from "@mui/material/colors";

const palette = {
    primary: red[500],
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
            secondary: red[300]
        }
    },
    typography: {
        allVariants: {
            color: palette.text,
        },
    },
});