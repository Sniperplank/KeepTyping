import { Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { useWordList } from '../contexts/wordListContext'
import { useNavigate } from 'react-router-dom'
import CharacterInput from '../styledComponents/CharacterInput'
import { useVolume } from '../contexts/volumeContext'
import typingsound from '../sounds/typingsound.mp3'
import correctsound from '../sounds/correct.mp3'
import wrongsound from '../sounds/wrong.mp3'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWYZ"
const time = 6

function HardGame() {
    const [usedWords, setUsedWords] = useState([])
    const [timeLeft, setTimeLeft] = useState(time)
    const [score, setScore] = useState(0)
    const [letter, setLetter] = useState('')
    const [inputWord, setInputWord] = useState("")
    const [error, setError] = useState('')
    const { wordList, setWordList } = useWordList()
    const navigate = useNavigate()
    const [wordLength, setWordLength] = useState()
    const { isVolumeOn, setIsVolumeOn } = useVolume()

    const typingAudioRef = useRef(null)
    const correctAudioRef = useRef(null)
    const wrongAudioRef = useRef(null)

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setWordLength(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
        setScore(0)
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
            navigate('/gameover', { state: { score: score } }) // Time ran out
        }

        return () => {
            clearInterval(timerId)
        }
    }, [timeLeft])

    const handleWordChange = (value) => {
        setInputWord(value)
    }

    const handleWordSubmit = event => {
        event.preventDefault()
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
                    setError('')
                    setUsedWords([...usedWords, inputWord])
                    setScore(prev => prev + 1)
                    setInputWord('')
                    setTimeLeft(time)
                    setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                    setWordLength(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
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

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={5}>
                <Typography variant='h5'>Score: {score}</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>Type a </Typography>
                    <Typography variant='h3' color='primary'>{wordLength}</Typography>
                    <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>letter word that starts with</Typography>
                </Stack>
                <Typography variant='h2' color='primary'>{letter}</Typography>
            </Stack>
            <CharacterInput length={wordLength} value={inputWord} onChange={handleWordChange} handleWordSubmit={handleWordSubmit} />
            <Typography variant='h5' color='red'>{error}</Typography>
            <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main' }} onClick={() => { navigate(-1) }}>Back</StyledButton>
            <p className='timer'>{timeLeft}</p>
        </Stack>
    )
}

export default HardGame