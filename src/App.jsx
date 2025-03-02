import { Stack, Typography, ThemeProvider, TextField } from '@mui/material'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'
import { useTheme } from './contexts/themeContext'
import './App.css'
import { StyledIconButton } from './styledComponents/StyledIconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Home from './pages/home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Game from './pages/Game'
import Score from './pages/Score'
import { StyledButton } from './styledComponents/StyledButton'
import KeyboardIcon from '@mui/icons-material/Keyboard';

function App() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const location = useLocation()

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack>
        {location.path !== '/' &&
          <Stack direction='row' justifyContent='space-around' sx={{ mb: 15 }}>
            <KeyboardIcon fontSize='large' color='primary' />
            <Stack direction='row' spacing={2}>
              <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }}>
                {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
              </StyledIconButton>
              <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main' }}>Sign In</StyledButton>
            </Stack>
          </Stack>
        }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Game />} />
          <Route path='/gameover' element={<Score />} />
        </Routes>
      </Stack>
    </ ThemeProvider >

  )
}

export default App
