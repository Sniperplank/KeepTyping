import { Stack, Typography, ThemeProvider, TextField } from '@mui/material'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'
import { useTheme } from './contexts/themeContext'
import './App.css'
import { StyledIconButton } from './styledComponents/StyledIconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import QuickGame from './pages/QuickGame'
import Score from './pages/Score'
import { StyledButton } from './styledComponents/StyledButton'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import HardGame from './pages/HardGame'
import CategoriesGame from './pages/CategoriesGame'

function App() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const location = useLocation()

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack>
        <Stack direction='row' justifyContent='space-around' sx={{ mb: 15 }}>
          <Stack direction='row' spacing={2}>
            <KeyboardIcon fontSize='large' color='primary' />
            {location.pathname !== '/' && <Typography variant='h5' color='primary' fontWeight='bold'>KeepTyping</Typography>}
          </Stack>
          <Stack direction='row' spacing={2}>
            <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }}>
              {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
            </StyledIconButton>
            <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main' }}>Sign In</StyledButton>
          </Stack>
        </Stack>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quick-game' element={<QuickGame />} />
          <Route path='/hard-game' element={<HardGame />} />
          <Route path='/categories-game' element={<CategoriesGame />} />
          <Route path='/gameover' element={<Score />} />
        </Routes>
      </Stack>
    </ ThemeProvider >

  )
}

export default App
