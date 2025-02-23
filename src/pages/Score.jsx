import { Stack, Typography } from '@mui/material'
import React from 'react'
import { StyledButton } from '../styledComponents/StyledButton'

function Score() {
    return (
        <Stack spacing={10} sx={{ m: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={10}>
                <Typography variant='h2' color='error'>Time is up!</Typography>
                <Typography variant='h2'>Your score was<Typography variant='h2' color='primary'>{score}</Typography></Typography>
            </Stack>
            <StyledButton color='primary' variant='contained' sx={{ width: '20%' }}
                onClick={() => {
                    setGameOver(false)
                    setPlaying(false)
                }}>Home</StyledButton>
        </Stack>
    )
}

export default Score