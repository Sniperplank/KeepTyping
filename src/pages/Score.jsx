import { Stack, Typography } from '@mui/material'
import React from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useLocation, useNavigate } from 'react-router-dom'

function Score() {
    const location = useLocation()
    const score = location.state.score
    const navigate = useNavigate()

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h2' color='error'>TIME IS UP!</Typography>
            <Stack spacing={5}>
                <Typography variant='h2'>Your score was</Typography>
                <Typography variant='h2' color='primary'>{score}</Typography>
            </Stack>
            <Stack direction='row' width={{ xs: '100%', sm: '50%' }} justifyContent='space-evenly'>
                {/* add a button to save score if not signed in */}
                <StyledButton color='primary' variant='contained' sx={{ width: 1 / 3 }} onClick={() => { navigate(-1) }}>Play Again</StyledButton>
                <StyledButton color='primary' variant='contained' sx={{ width: 1 / 3 }} onClick={() => { navigate('/') }}>Home</StyledButton>
            </Stack>
        </Stack>
    )
}

export default Score