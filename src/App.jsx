import React, { useState } from 'react'
import { Stack, Typography, ThemeProvider } from '@mui/material'
import { darkTheme } from './themes/darkTheme'
import { lightTheme } from './themes/lightTheme'
import { useTheme } from './contexts/themeContext'
import './App.css'
import { StyledIconButton } from './styledComponents/StyledIconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { Route, Routes, useLocation } from 'react-router-dom'
import QuickGame from './pages/QuickGame'
import Score from './pages/Score'
import Home from './pages/Home'
import { StyledButton } from './styledComponents/StyledButton'
import HardGame from './pages/HardGame'
import CategoriesGame from './pages/CategoriesGame'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { useVolume } from './contexts/volumeContext'
import Room from './pages/Room'
import OnlineQuickGame from './pages/OnlineQuickGame'
import OnlineHardGame from './pages/OnlineHardGame'
import OnlineScore from './pages/OnlineScore'
import MenuModal from './modals/MenuModal'
import MenuIcon from '@mui/icons-material/Menu'

function App() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const { isVolumeOn, setIsVolumeOn } = useVolume()
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const location = useLocation()

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack>
        <Stack direction='row' justifyContent='space-around' sx={{ mb: 15 }}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <MenuIcon fontSize='large' color='primary' onClick={() => setIsMenuModalOpen(true)} sx={{ ':hover': { cursor: 'pointer' } }} />
          </Stack>
          <Stack direction='row' spacing={2}>
            <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }}>
              {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
            </StyledIconButton>
            <StyledIconButton onClick={() => { setIsVolumeOn(prev => !prev) }}>
              {isVolumeOn ? <VolumeUpIcon color={'primary'} /> : <VolumeOffIcon color={'primary'} />}
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
          <Route path='/room/:roomCode' element={<Room />} />
          <Route path='/quick-match' element={<OnlineQuickGame />} />
          <Route path='/hard-match' element={<OnlineHardGame />} />
          <Route path='/match-over' element={<OnlineScore />} />
        </Routes>
      </Stack>
      <MenuModal open={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
    </ ThemeProvider >

  )
}

export default App
