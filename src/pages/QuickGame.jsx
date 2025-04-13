import { Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'
import { useWordList } from '../contexts/wordListContext'
import { useNavigate } from 'react-router-dom'
import typingsound from '../sounds/typingsound.mp3'
import correctsound from '../sounds/correct.mp3'
import wrongsound from '../sounds/wrong.mp3'
import { useVolume } from '../contexts/volumeContext'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const time = 4

function QuickGame() {
    const [usedWords, setUsedWords] = useState([])
    const [timeLeft, setTimeLeft] = useState(time)
    const [score, setScore] = useState(0)
    const [letter, setLetter] = useState('')
    const [inputWord, setInputWord] = useState("")
    const [error, setError] = useState('')
    const { wordList, setWordList } = useWordList()
    const navigate = useNavigate()
    const { isVolumeOn, setIsVolumeOn } = useVolume()

    const typingAudioRef = useRef(null)
    const correctAudioRef = useRef(null)
    const wrongAudioRef = useRef(null)

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
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

    const handleKeydown = event => {
        // Play sound only for alphanumeric keys (letters and numbers)
        const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key)

        if (isAlphanumeric && typingAudioRef.current && isVolumeOn) {
            typingAudioRef.current.currentTime = 0
            typingAudioRef.current.play().catch(e => console.error("Error playing 'typing' audio:", e))
        }
    }

    const handleWordSubmit = event => {
        event.preventDefault()

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

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={5}>
                <Typography variant='h5'>Score: {score}</Typography>
                <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>Type a word that starts with</Typography>
                <Typography variant='h2' color='primary'>{letter}</Typography>
            </Stack>
            <form onSubmit={handleWordSubmit}>
                <StyledInput type="text" value={inputWord} InputLabelProps={{ shrink: true, }} variant="standard" autoFocus sx={{ width: '50%' }} onChange={e => setInputWord(e.target.value)} onKeyDown={handleKeydown} inputProps={{ style: { fontSize: 40 }, autoComplete: 'off' }} />
                <button type="submit" style={{ display: 'none' }}>Submit</button>
            </form>
            <Typography variant='h6' color='red'>{error}</Typography>
            <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main' }} onClick={() => { navigate(-1) }}>Back</StyledButton>
            <p className='timer'>{timeLeft}</p>
        </Stack>
    )
}

export default QuickGame