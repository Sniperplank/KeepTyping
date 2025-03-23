import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useWordList } from '../contexts/wordListContext'
import { useLocation, useNavigate } from 'react-router-dom'
import CharacterInput from '../styledComponents/CharacterInput'
import { useVolume } from '../contexts/volumeContext'
import typingsound from '../sounds/typingsound.mp3'
import correctsound from '../sounds/correct.mp3'
import wrongsound from '../sounds/wrong.mp3'
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
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const time = 6

function OnlineHardGame() {
  const location = useLocation()
  const isItMyTurn = location.state.isItMyTurn
  const [usedWords, setUsedWords] = useState([])
  const [timeLeft, setTimeLeft] = useState(time)
  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [letter, setLetter] = useState('')
  const [inputWord, setInputWord] = useState("")
  const [error, setError] = useState('')
  const { wordList, setWordList } = useWordList()
  const navigate = useNavigate()
  const [wordLength, setWordLength] = useState()
  const { isVolumeOn, setIsVolumeOn } = useVolume()
  const [myTurn, setMyTurn] = useState(isItMyTurn)
  const [myAvatar, setMyAvatar] = useState("")
  const [opponentAvatar, setOpponentAvatar] = useState("")

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
    setWordLength(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
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
    // socket.on("playerLeft", handlePlayerLeft)
    socket.on("gameOver", (data) => {
      navigate('/match-over', { state: { timeoutPlayer: data.timeoutPlayer, mode: "Turn-based" } }) // Time ran out
    })
    socket.on("yourTurn", (data) => {
      setMyTurn(true)
      setLetter(data.nextLetter)
      setWordLength(data.nextWordLength)
      setTimeLeft(time)
    })

    return () => {
      socket.off("opponentScoreUpdate")
      // socket.off("playerLeft", handlePlayerLeft)
      socket.off("gameOver")
      socket.off("yourTurn")
    }
  }, [myScore, opponentScore, navigate])

  const handleWordChange = (value) => {
    setInputWord(value)
  }

  const handleWordSubmit = event => {
    // Play sound only for alphanumeric keys (letters and numbers)
    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key)

    if (isAlphanumeric && typingAudioRef.current && isVolumeOn) {
      typingAudioRef.current.currentTime = 0
      typingAudioRef.current.play().catch(e => console.error("Error playing 'typing' audio:", e))
    }

    if (event.keyCode === 13) { // Enter key was pressed
      if (inputWord.length === wordLength) {
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
            const nextLetter = inputWord.charAt(inputWord.length - 1).toUpperCase()
            const nextWordLength = Math.floor(Math.random() * (6 - 3 + 1)) + 3
            const roomCode = sessionStorage.getItem('roomCode')

            socket.emit("switchTurn", {
              roomCode,
              nextLetter,
              nextWordLength
            })

            setError('')
            setUsedWords([...usedWords, inputWord])
            setMyScore(prev => prev + 1)
            setInputWord('')
            setLetter(nextLetter)
            setWordLength(nextWordLength)
            setMyTurn(false)
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
      } else {
        setError(`Word must be ${wordLength} letters long!`)
        if (wrongAudioRef.current && isVolumeOn) {
          wrongAudioRef.current.currentTime = 0
          wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
        }
      }
    }
  }

  return (
    <Stack spacing={{ xs: 5, sm: 10 }} direction='row' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'primary.main', p: 2, borderRadius: 2, height: 150 }}>
        <Box component="img" src={avatarImages[myAvatar]} width={120} height={120} />
        {myTurn && <Typography variant="h6" color='primary' sx={{ fontWeight: 'bold' }}>Your Turn</Typography>}
      </Stack>
      <Stack spacing={{ xs: 5, sm: 5 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 45 } }}>Type a </Typography>
          <Typography variant='h3' color='primary'>{wordLength}</Typography>
          <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 45 } }}>letter word that starts with</Typography>
        </Stack>
        <Typography variant='h2' color='primary'>{letter}</Typography>
        <CharacterInput length={wordLength} value={inputWord} onChange={handleWordChange} onKeyDown={handleWordSubmit} disabled={!myTurn} />
        <Typography variant='h5' color='red'>{error}</Typography>
        <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main' }} onClick={() => { navigate(-1) }}>Back</StyledButton>
        <p className='timer'>{timeLeft}</p>
      </Stack>
      <Stack spacing={1} sx={{ alignSelf: 'center', alignItems: 'center', width: 150, border: '2px solid', borderColor: 'error.main', p: 2, borderRadius: 2, height: 150 }}>
        <Box component="img" src={avatarImages[opponentAvatar]} width={120} height={120} />
        {!myTurn && <Typography variant="h6" color='error'>Opponent's Turn</Typography>}
      </Stack>
    </Stack>
  )
}

export default OnlineHardGame