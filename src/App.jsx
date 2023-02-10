import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import './App.css'

function App() {
  return (
    <Stack>
      <Typography variant='h2'>KeepTyping</Typography>
      <Stack sx={{m: 10}}>
        <Typography variant='h5'>How to play:</Typography>
      </Stack>
    </Stack>
  )
}

export default App
