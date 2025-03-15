import React from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { StyledButton } from '../styledComponents/StyledButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import socket from '../socketService'
import { StyledIconButton } from '../styledComponents/StyledIconButton'

function Room() {
    const { roomCode } = useParams()
    const [searchParams] = useSearchParams()
    const [mode, setMode] = useState("")
    const navigate = useNavigate()
    const [status, setStatus] = useState("")
    const [countdown, setCountdown] = useState(null)
    const [copyConfirmation, setCopyConfirmation] = useState("")
    const url = `http://localhost:5173/room/${roomCode}?mode=${mode}`

    useEffect(() => {
        if (!roomCode) return  // Prevents undefined room codes

        const selectedMode = searchParams.get('mode')
        setMode(selectedMode)

        socket.emit("joinRoom", { roomCode })

        const handleStartGame = (gameMode) => {
            console.log(`Game started in ${gameMode} mode!`)
            const path = gameMode === 'quick' ? '/quick-game' : '/hard-game'
            // navigate(path)
        }

        const handleWaiting = (message) => {
            setStatus(message)
        }

        const handleCountdown = (seconds) => {
            setCountdown(seconds)
            setStatus(`Game starting in ${seconds}...`)
        }

        const handlePlayerLeft = (message) => {
            setStatus(message)
            setCountdown(null)
        }

        const handleError = (message) => {
            console.error(message)
        }

        //clean up any existing listeners before adding new ones
        socket.off("startGame").off("waiting").off("countdown").off("playerLeft").off("error")

        socket.on("startGame", handleStartGame)
        socket.on("waiting", handleWaiting)
        socket.on("countdown", handleCountdown)
        socket.on("playerLeft", handlePlayerLeft)
        socket.on("error", handleError)

        // Cleanup to prevent multiple listeners
        return () => {
            socket.off("startGame", handleStartGame)
            socket.off("waiting", handleWaiting)
            socket.off("countdown", handleCountdown)
            socket.off("playerLeft", handlePlayerLeft)
            socket.off("error", handleError)
        }
    }, [roomCode, searchParams])

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopyConfirmation('Invite link copied to clipboard!')
                const timer = setTimeout(() => {
                    setCopyConfirmation('')
                }, 2000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                console.error('Failed to copy:', err)
                setCopyConfirmation('Failed to copy invite link.')
            })
    }

    return (
        <Stack spacing={4}>
            <Typography variant="h2" align="center">{status}</Typography>
            {countdown !== null && (
                <Stack spacing={2}>
                    <CircularProgress variant="determinate" value={(countdown / 5) * 100} size={120} thickness={4} sx={{ alignSelf: 'center' }} />
                    <Typography variant="h2" color="primary">{countdown}</Typography>
                </Stack>
            )}
            {countdown === null && (
                <Stack spacing={3} >
                    <Typography variant='h6'>Share this link with someone to challenge them!</Typography>
                    <Stack direction='row' spacing={2} alignSelf='center' sx={{ border: 'solid', p: 2, borderRadius: 4, borderColor: 'primary.main', '&:hover': { cursor: 'pointer' } }} onClick={copyToClipboard}>
                        <Typography variant='h6' sx={{ alignSelf: 'center' }} onClick={copyToClipboard}>Copy Link!</Typography>
                        <ContentCopyIcon color='primary' sx={{ alignSelf: 'center' }} />
                    </Stack>
                    <Typography variant='body1' color='primary'>{copyConfirmation}</Typography>
                </Stack>
            )}
            <Typography variant="h5">Game Mode: <strong>{mode.toUpperCase()}</strong></Typography>
            <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main', alignSelf: 'center' }} onClick={() => { navigate(-1) }}>Cancel</StyledButton>
        </Stack>
    )
}

export default Room