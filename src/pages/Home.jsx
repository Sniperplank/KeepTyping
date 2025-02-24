import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useNavigate } from 'react-router-dom'
import HowToModal from '../HowToModal'

function Home() {
    const [isHTPModalOpen, setIsHTPModalOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <Stack>
            <Typography variant='h2' color='primary'>KeepTyping</Typography>
            <Stack spacing={10} sx={{ m: 10 }}>
                <StyledButton color='primary' variant='contained' onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
                <StyledButton color='primary' variant='contained' onClick={() => { navigate('/play') }}>Play</StyledButton>
            </Stack>
            <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
        </Stack>
    )
}

export default Home