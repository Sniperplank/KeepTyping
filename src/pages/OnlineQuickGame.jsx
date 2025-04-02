import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'
import { useWordList } from '../contexts/wordListContext'
import { useNavigate } from 'react-router-dom'
import typingsound from '../sounds/typingsound.mp3'
import correctsound from '../sounds/correct.mp3'
import wrongsound from '../sounds/wrong.mp3'
import { useVolume } from '../contexts/volumeContext'
import socket from '../socketService'
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
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const time = 4

function OnlineQuickGame() {
    const [usedWords, setUsedWords] = useState([])
    const [timeLeft, setTimeLeft] = useState(time)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [letter, setLetter] = useState('')
    const [inputWord, setInputWord] = useState("")
    const [error, setError] = useState('')
    const { wordList, setWordList } = useWordList()
    const navigate = useNavigate()
    const { isVolumeOn, setIsVolumeOn } = useVolume()
    const [myAvatar, setMyAvatar] = useState("")
    const [opponentAvatar, setOpponentAvatar] = useState("")
    const [roomCode, setRoomCode] = useState(sessionStorage.getItem('roomCode'))

    const typingAudioRef = useRef(null)
    const correctAudioRef = useRef(null)
    const wrongAudioRef = useRef(null)

    useEffect(() => {
        // Get stored avatar data when the game starts
        const avatarsData = JSON.parse(sessionStorage.getItem('gameAvatars') || '{}')
        const playerSocketId = sessionStorage.getItem('playerSocketId')

        // Your avatar
        setMyAvatar(avatarsData[playerSocketId])

        // Opponent's avatar (find the other player's ID)
        const opponentId = Object.keys(avatarsData).find(id => id !== playerSocketId)
        setOpponentAvatar(avatarsData[opponentId])
    }, [])

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setMyScore(0)
        setUsedWords([])
        setError('')
        setTimeLeft(time)

        // Create and load the audio elements
        const typingAudio = new Audio(typingsound)
        typingAudio.preload = 'auto'
        typingAudioRef.current = typingAudio

        const correctAudio = new Audio(correctsound)
        correctAudio.preload = 'auto'
        correctAudioRef.current = correctAudio

        const wrongAudio = new Audio(wrongsound)
        wrongAudio.preload = 'auto'
        wrongAudioRef.current = wrongAudio

        return () => {
            if (typingAudioRef.current) {
                typingAudioRef.current.pause()
                typingAudioRef.current = null
            }
            if (correctAudioRef.current) {
                correctAudioRef.current.pause()
                correctAudioRef.current = null
            }
            if (wrongAudioRef.current) {
                wrongAudioRef.current.pause()
                wrongAudioRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        let timerId
        if (timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        } else {
            const roomCode = sessionStorage.getItem('roomCode')
            setRoomCode(roomCode)
            if (roomCode) {
                socket.emit("playerTimeout", {
                    roomCode,
                    finalScore: myScore,
                    playerSocketId: sessionStorage.getItem('playerSocketId')
                })
            }
        }

        return () => {
            clearInterval(timerId)
        }
    }, [timeLeft])

    useEffect(() => {
        // Listen for opponent score updates
        socket.on("opponentScoreUpdate", (score) => {
            setOpponentScore(score)
        })
        socket.on("playerLeft", () => {
            navigate('/match-over', { state: { otherPlayerLeft: true, mode: 'quick', prevRoomCode: roomCode } })
        })
        socket.on("gameOver", (data) => {
            navigate('/match-over', { state: { myScore: myScore, opponentScore: opponentScore, myAvatar: myAvatar, opponentAvatar: opponentAvatar, timeoutPlayer: data.timeoutPlayer, mode: 'quick', prevRoomCode: roomCode } }) // Time ran out
        })

        return () => {
            socket.off("opponentScoreUpdate")
            socket.off("playerLeft")
            socket.off("gameOver")
        }
    }, [myScore, opponentScore, navigate])

    const handleWordSubmit = event => {
        // Play sound only for alphanumeric keys (letters and numbers)
        const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key)

        if (isAlphanumeric && typingAudioRef.current && isVolumeOn) {
            typingAudioRef.current.currentTime = 0
            typingAudioRef.current.play().catch(e => console.error("Error playing 'typing' audio:", e))
        }

        if (event.keyCode === 13) { // Enter key was pressed
            if (wordList.includes(inputWord.toUpperCase())) {
                if (inputWord.charAt(0).toUpperCase() == letter) {
                    if (usedWords.includes(inputWord)) {
                        setError('Already used this word!')
                        if (wrongAudioRef.current && isVolumeOn) {
                            wrongAudioRef.current.currentTime = 0
                            wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                        }
                        return
                    }
                    setError('')
                    setUsedWords([...usedWords, inputWord])
                    const newScore = myScore + 1;
                    setMyScore(newScore)
                    const roomCode = sessionStorage.getItem('roomCode');
                    if (roomCode) {
                        socket.emit("updateScore", { roomCode, score: newScore })
                    }
                    setInputWord('')
                    setTimeLeft(time)
                    setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                    if (correctAudioRef.current && isVolumeOn) {
                        correctAudioRef.current.currentTime = 0
                        correctAudioRef.current.play().catch(e => console.error("Error playing 'correct' audio:", e))
                    }
                } else {
                    setError('Word must start with ' + letter)
                    if (wrongAudioRef.current && isVolumeOn) {
                        wrongAudioRef.current.currentTime = 0
                        wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                    }
                }
            } else {
                setError('Not a word :/')
                if (wrongAudioRef.current && isVolumeOn) {
                    wrongAudioRef.current.currentTime = 0
                    wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                }
            }
        }
    }

    const handleLeaveRoom = () => {
        socket.emit("leaveRoom", { roomCode })
        navigate('/')
    }

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} direction={{ xs: 'column', sm: 'row' }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'primary.main', p: 2, borderRadius: 2, height: 150 }}>
                <Box component="img" src={avatarImages[myAvatar]} width={120} height={120} />
                <Typography variant="h6">{myScore}</Typography>
            </Stack>
            <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={5}>
                    <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>Type a word that starts with</Typography>
                    <Typography variant='h2' color='primary'>{letter}</Typography>
                </Stack>
                <StyledInput type="text" value={inputWord} InputLabelProps={{ shrink: true, }} variant="standard" autoFocus sx={{ width: '50%' }} onChange={e => setInputWord(e.target.value)} onKeyDown={handleWordSubmit} inputProps={{ style: { fontSize: 40 }, autoComplete: 'off' }} />
                <Typography variant='h6' color='red'>{error}</Typography>
                <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main' }} onClick={handleLeaveRoom}>Leave</StyledButton>
                <p className='timer'>{timeLeft}</p>
            </Stack>
            <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'error.main', p: 2, borderRadius: 2, height: 150 }}>
                <Box component="img" src={avatarImages[opponentAvatar]} width={120} height={120} />
                <Typography variant="h6">{opponentScore}</Typography>
            </Stack>
        </Stack>
    )
}

export default OnlineQuickGame