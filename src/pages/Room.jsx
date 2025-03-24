import React from 'react'
import { Avatar, Box, Button, CircularProgress, imageListClasses, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { StyledButton } from '../styledComponents/StyledButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import socket from '../socketService'
import bear from '../sprites/bear.svg'
import fox from '../sprites/fox.svg'
import monkey from '../sprites/monkey.svg'
import zebra from '../sprites/zebra.svg'

const avatarImages = {
    'Bear': bear,
    'Fox': fox,
    'Zebra': zebra,
    'Monkey': monkey
}

function Room() {
    const { roomCode } = useParams()
    const [searchParams] = useSearchParams()
    const [mode, setMode] = useState("")
    const navigate = useNavigate()
    const [status, setStatus] = useState("")
    const [countdown, setCountdown] = useState(null)
    const [copyConfirmation, setCopyConfirmation] = useState("")
    const [copyLinkText, setCopyLinkText] = useState("Copy Link")
    const [showLink, setShowLink] = useState(false)
    const [myAvatar, setMyAvatar] = useState(null)
    const [allAvatars, setAllAvatars] = useState({})
    // const url = `http://localhost:5173/room/${roomCode}?mode=${mode}`
    const url = `https://keep-typing.vercel.app/room/${roomCode}?mode=${mode}`

    useEffect(() => {
        if (!roomCode) return  // Prevents undefined room codes

        const selectedMode = searchParams.get('mode')
        setMode(selectedMode)

        socket.emit("joinRoom", { roomCode })

        const handleStartGame = (gameData) => {
            sessionStorage.setItem('gameAvatars', JSON.stringify(gameData.avatars))
            sessionStorage.setItem('playerSocketId', socket.id)
            sessionStorage.setItem('roomCode', roomCode)

            const myTurn = gameData.firstPlayerId === socket.id

            const path = gameData.mode === 'quick' ? '/quick-match' : '/hard-match'
            navigate(path, { state: { isItMyTurn: myTurn } })
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

        const handleAvatarAssigned = (data) => {
            if (data.playerId === socket.id) {
                setMyAvatar(data.avatar)
            }
        }

        const handleAllAvatars = (avatars) => {
            setAllAvatars(avatars)
        }

        //clean up any existing listeners before adding new ones
        socket.off("startGame").off("waiting").off("countdown").off("playerLeft").off("error").off("avatarAssigned").off("allAvatars")

        socket.on("startGame", handleStartGame)
        socket.on("waiting", handleWaiting)
        socket.on("countdown", handleCountdown)
        socket.on("playerLeft", handlePlayerLeft)
        socket.on("error", handleError)
        socket.on("avatarAssigned", handleAvatarAssigned)
        socket.on("allAvatars", handleAllAvatars)

        // Cleanup to prevent multiple listeners
        return () => {
            socket.off("startGame", handleStartGame)
            socket.off("waiting", handleWaiting)
            socket.off("countdown", handleCountdown)
            socket.off("playerLeft", handlePlayerLeft)
            socket.off("error", handleError)
            socket.off("avatarAssigned", handleAvatarAssigned)
            socket.off("allAvatars", handleAllAvatars)
        }
    }, [roomCode, searchParams])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopyLinkText('COPIED!')
                const timer = setTimeout(() => {
                    setCopyLinkText('Copy Link')
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                console.error('Failed to copy:', err)
                setCopyConfirmation('Failed to copy invite link.')
            })
    }

    const handleLeaveRoom = () => {
        socket.disconnect()
        navigate('/')
    }

    // Find opponent's avatar
    const opponentId = Object.keys(allAvatars).find(id => id !== socket.id)
    const opponentAvatar = opponentId ? allAvatars[opponentId] : null

    return (
        <Stack spacing={4}>
            <Typography variant="h2" align="center">{status}</Typography>
            {countdown !== null && (
                <Stack spacing={2}>
                    <Stack direction='row' spacing={2} sx={{ alignSelf: 'center' }}>
                        <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'primary.main', p: 2, borderRadius: 2, height: 150 }}>
                            <Box component="img" src={avatarImages[myAvatar]} width={120} height={120} />
                            <Typography variant="h6">You</Typography>
                        </Stack>

                        {opponentAvatar && (
                            <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'error.main', p: 2, borderRadius: 2, height: 150 }}>
                                <Box component="img" src={avatarImages[opponentAvatar]} width={120} height={120} />
                                <Typography variant="h6">Opponent</Typography>
                            </Stack>
                        )}
                    </Stack>

                    <CircularProgress variant="determinate" value={(countdown / 5) * 100} size={120} thickness={4} sx={{ alignSelf: 'center' }} />
                    <Typography variant="h2" color="primary">{countdown}</Typography>
                </Stack>
            )}
            {countdown === null && (
                <Stack spacing={3} >
                    {myAvatar && (
                        <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'primary.main', p: 2, borderRadius: 2, height: 150 }}>
                            <Box component="img" src={avatarImages[myAvatar]} width={120} height={120} />
                            <Typography variant="h6">You</Typography>
                        </Stack>
                    )}
                    <Typography variant='h6'>Share this link with someone to challenge them!</Typography>
                    <Stack direction='row' spacing={2} alignSelf='center' sx={{ border: 'solid', p: 2, borderRadius: 4, borderColor: 'primary.main', '&:hover': { cursor: 'pointer' } }} onClick={copyToClipboard}>
                        <Typography variant='h6' sx={{ alignSelf: 'center' }} onClick={copyToClipboard}>{copyLinkText}</Typography>
                        <ContentCopyIcon color='primary' sx={{ alignSelf: 'center' }} />
                    </Stack>
                    <Typography variant='body1' color='primary'>{copyConfirmation}</Typography>
                    <Button sx={{ width: '20%', alignSelf: 'center' }} onClick={() => { setShowLink(prev => !prev) }}>{showLink ? 'Hide Link' : 'Show Link'}</Button>
                    <Typography variant='body1' sx={{ display: showLink ? 'flex' : 'none', alignSelf: 'center' }}>{url}</Typography>
                </Stack>
            )
            }
            <Typography variant="h5">Game Mode: <strong>{mode.toUpperCase()}</strong></Typography>
            <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main', alignSelf: 'center' }} onClick={handleLeaveRoom}>Cancel</StyledButton>
        </Stack >
    )
}

export default Room