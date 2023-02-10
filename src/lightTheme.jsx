import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#facc15",
            light: "#ffb74d"
        },
        secondary: {
            main: "#d6d6d6",
            light: "#e3e3e3"
        },
        buttonText: {
            main: "#212121"
        },
        text: {
            main: '#3b3b3b',
            input: 'black'
        },
        body: {
            main: '#faf6ed'
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 660,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
})