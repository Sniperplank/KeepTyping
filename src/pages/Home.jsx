import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useNavigate } from 'react-router-dom'
import HowToModal from '../HowToModal'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ShapeLineIcon from '@mui/icons-material/ShapeLine'
import CategoryIcon from '@mui/icons-material/Category'

function Home() {
    const [isHTPModalOpen, setIsHTPModalOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <Stack spacing={10} justifyContent='center'>
            <Typography variant='h2' color='primary'>KeepTyping</Typography>
            <Stack spacing={10} direction='row' justifyContent='center'>
                <StyledButton color='primary' variant='contained' sx={{width: 1/3}} startIcon={<RocketLaunchIcon />} onClick={() => { navigate('/play') }}>Quick Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{width: 1/3}} startIcon={<ShapeLineIcon />} onClick={() => { }}>Hard Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{width: 1/3}} startIcon={<CategoryIcon />} onClick={() => { }}>Categories Game</StyledButton>
            </Stack>
            <Stack spacing={10} direction='row' justifyContent='center'>
                <StyledButton color='primary' variant='outlined' sx={{ color: 'text.main' }} onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
            </Stack>
            <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
        </Stack>
    )
}

export default Home