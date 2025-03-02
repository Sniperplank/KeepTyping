import { Stack, Typography } from '@mui/material'
import React from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useLocation, useNavigate } from 'react-router-dom'

function Score() {
    const location = useLocation()
    const score = location.state.score
    const navigate = useNavigate()

    return (
        <Stack spacing={10} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={10}>
                <Typography variant='h2' color='error'>Time is up!</Typography>
                <Typography variant='h2'>Your score was<Typography variant='h2' color='primary'>{score}</Typography></Typography>
            </Stack>
            <StyledButton color='primary' variant='contained' sx={{ width: '20%' }} onClick={() => { navigate('/play') }}>Play Again</StyledButton>
            <StyledButton color='primary' variant='contained' sx={{ width: '20%' }} onClick={() => { navigate('/') }}>Home</StyledButton>
        </Stack>
    )
}

export default Score