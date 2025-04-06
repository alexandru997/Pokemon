import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        background: {
            default: '#231321',
            paper: '#2e1a2a',
        },
        primary: {
            main: '#FFCB05',
        },
        secondary: {
            main: '#2A75BB',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cfcfcf',
        },
    },
    typography: {
        fontFamily: `'Segoe UI', 'Roboto', 'Arial', sans-serif`,
    },
})
