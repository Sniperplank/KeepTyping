import { useState } from 'react'
import { Box, Stack, Typography, ThemeProvider } from '@mui/material'
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useTheme } from './contexts/themeContext';
import './App.css'

function App() {
  const { isDarkMode } = useTheme()

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack>
        <Typography variant='h2'>KeepTyping</Typography>
        <Stack sx={{ m: 10 }}>
          <Typography variant='h5'>How to play:</Typography>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default App
