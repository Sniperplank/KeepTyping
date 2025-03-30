import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useNavigate } from 'react-router-dom'
import HowToModal from '../modals/HowToModal'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ShapeLineIcon from '@mui/icons-material/ShapeLine'
import CategoryIcon from '@mui/icons-material/Category'
import GroupIcon from '@mui/icons-material/Group';
import OnlineModeModal from '../modals/OnlineModeModal'

function Home() {
    const [isHTPModalOpen, setIsHTPModalOpen] = useState(false)
    const [isModeModalOpen, setIsModeModalOpen] = useState(false)
    const navigate = useNavigate()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Stack spacing={{ xs: 3, sm: 10 }} justifyContent='center'>
            <Typography variant='h1' color='primary' fontWeight='bold' alignSelf='center' sx={{ fontSize: { xs: 50, sm: 100 } }}>KeepTyping</Typography>
            <Typography variant='h6' color='text.main' alignSelf='center'>The ultimate typing challenge! Test your speed, vocabulary, and quick thinking in three exciting game modes</Typography>
            <Stack spacing={{ xs: 4, sm: 10 }} direction={{ xs: 'column', sm: 'row' }} justifyContent='space-evenly' alignItems='center'>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<RocketLaunchIcon />} onClick={() => { navigate('/quick-game') }}>Quick Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<ShapeLineIcon />} onClick={() => { navigate('/hard-game') }}>Hard Game</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{ width: { xs: 1 / 2, sm: 1 / 3 } }} startIcon={<CategoryIcon />} onClick={() => { navigate('/categories-game') }}>Categories Game</StyledButton>
            </Stack>
            <Stack spacing={10} direction='row' justifyContent='center'>
                <StyledButton color='primary' variant='contained' startIcon={<GroupIcon />} onClick={() => setIsModeModalOpen(true)}>Play with friends</StyledButton>
                <StyledButton color='primary' variant='outlined' sx={{ color: 'text.main' }} onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
            </Stack>
            <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
            <OnlineModeModal open={isModeModalOpen} onClose={() => setIsModeModalOpen(false)} />
        </Stack >
    )
}

export default Home