import { useState } from 'react'
import { Stack, Typography, ThemeProvider } from '@mui/material'
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useTheme } from './contexts/themeContext';
import './App.css'
import { StyledButton } from './styledComponents/StyledButton';
import HowToModal from './howToModal';
import { StyledIconButton } from './styledComponents/StyledIconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

function App() {
  const [isHTPModalOpen, setIsHTPModalOpen] = useState(false)
  const { isDarkMode, setIsDarkMode } = useTheme()
  const [playing, setPlaying] = useState(false)

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {
        !playing &&
        <Stack>
          <Typography variant='h2'>KeepTyping</Typography>
          <Stack spacing={10} sx={{ m: 10 }}>
            <StyledButton color='primary' variant='contained' onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
            <StyledButton color='primary' variant='contained' onClick={() => setPlaying(true)}>Play</StyledButton>
          </Stack>
        </Stack>
      }
      {
        playing &&
        <Stack>
          <Typography variant='h2'>Score</Typography>

        </Stack>
      }
      <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }}>
        {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
      </StyledIconButton>
      <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
    </ThemeProvider>
  )
}

export default App
