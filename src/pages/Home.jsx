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
        <Stack spacing={{ xs: 10, sm: 15 }} justifyContent='center'>
            <Typography variant='h1' color='primary' fontWeight='bold' alignSelf='center' sx={{ fontSize: { xs: 50, sm: 100 } }}>KeepTyping</Typography>
            <Stack spacing={10} direction={{ xs: 'column', sm: 'row' }} justifyContent='space-evenly' alignItems='center'>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<RocketLaunchIcon />} onClick={() => { navigate('/quick-game') }}>Quick Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<ShapeLineIcon />} onClick={() => { navigate('/hard-game') }}>Hard Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<CategoryIcon />} onClick={() => { navigate('/categories-game') }}>Categories Game</StyledButton>
            </Stack>
            <Stack spacing={10} direction='row' justifyContent='center'>
                <StyledButton color='primary' variant='outlined' sx={{ color: 'text.main' }} onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
            </Stack>
            <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
        </Stack>
    )
}

export default Home