import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fb8c00",
            light: "#ffb74d"
        },
        secondary: {
            main: "#26231d",
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