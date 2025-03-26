import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useLocation, useNavigate } from 'react-router-dom'
import bear from '../sprites/bear.svg'
import fox from '../sprites/fox.svg'
import monkey from '../sprites/monkey.svg'
import zebra from '../sprites/zebra.svg'
import racoon from '../sprites/racoon.svg'
import horse from '../sprites/horse.svg'
import moose from '../sprites/moose.svg'
import elephant from '../sprites/elephant.svg'

const avatarImages = {
    'Bear': bear,
    'Fox': fox,
    'Zebra': zebra,
    'Racoon': racoon,
    'Horse': horse,
    'Moose': moose,
    'Elephant': elephant,
    'Monkey': monkey,
}

function OnlineScore() {
    const location = useLocation()
    const { myScore, opponentScore, timeoutPlayer, myAvatar, opponentAvatar, mode, otherPlayerLeft } = location.state || {}
    const mySocketId = sessionStorage.getItem('playerSocketId')
    const iLostOnTimeout = timeoutPlayer === mySocketId
    const navigate = useNavigate()

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={4}>
                <Typography variant="h2" align="center" color={iLostOnTimeout ? 'error' : 'primary'}>{!iLostOnTimeout || otherPlayerLeft ? 'You Win!' : 'Game Over!'}</Typography>

                <Typography variant="h6" align="center">{otherPlayerLeft ? 'Your opponent left the game!' : iLostOnTimeout ? 'You ran out of time!' : 'Your opponent ran out of time!'}</Typography>
                {
                    mode === "Turn-based" ||
                    <Stack>
                        <Typography variant="h4" align="center">Final Scores</Typography>
                        <Stack direction="row" spacing={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Stack>
                                <Typography variant="h4">You</Typography>
                                <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'primary.main', p: 2, borderRadius: 2, height: 150 }}>
                                    <Box component="img" src={avatarImages[myAvatar]} width={120} height={120} />
                                    <Typography variant="h4">{myScore}</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography variant="h4">Opponent</Typography>
                                <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'error.main', p: 2, borderRadius: 2, height: 150 }}>
                                    <Box component="img" src={avatarImages[opponentAvatar]} width={120} height={120} />
                                    <Typography variant="h4">{opponentScore}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                }

                <StyledButton color='primary' variant='contained' sx={{ width: 1 / 3, alignSelf: 'center' }} onClick={() => { navigate('/') }}>Home</StyledButton>
            </Stack>
        </Stack>
    )
}

export default OnlineScore