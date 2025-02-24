import { Stack, Typography, ThemeProvider, TextField } from '@mui/material'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'
import { useTheme } from './contexts/themeContext'
import './App.css'
import { StyledIconButton } from './styledComponents/StyledIconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import Game from './pages/Game'
import Score from './pages/Score'

function App() {
  const { isDarkMode, setIsDarkMode } = useTheme()

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Game />} />
          <Route path='/gameover' element={<Score />} />
        </Routes>
        <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }} sx={{ alignSelf: 'center' }}>
          {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
        </StyledIconButton>
      </Stack>
    </ ThemeProvider >

  )
}

export default App
