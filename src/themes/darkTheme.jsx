import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#a5db02",
            light: "#ffb74d"
        },
        secondary: {
            main: "#262626",
            light: "#302e28"
        },
        buttonText: {
            main: "#212121"
        },
        text: {
            main: '#b6b4b4',
            input: 'white'
        },
        body: {
            main: '#0e0b04'
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