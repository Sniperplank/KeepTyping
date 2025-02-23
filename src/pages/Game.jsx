import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function Game() {
    const [usedWords, setUsedWords] = useState([])
    const [timeLeft, setTimeLeft] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [letter, setLetter] = useState('')
    const [inputWord, setInputWord] = useState("")
    const [error, setError] = useState('')

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setScore(0)
        setUsedWords([])
        setError('')
        setTimeLeft(3)
    }, [])

    useEffect(() => {
        let timerId
        if (timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        } else {
            setGameOver(true)
        }

        return () => {
            clearInterval(timerId)
        }
    }, [timeLeft])

    const handleWordSubmit = event => {
        if (event.keyCode === 13) { // Enter key was pressed
            if (wordList.includes(inputWord)) {
                if (inputWord.charAt(0).toUpperCase() == letter) {
                    if (usedWords.includes(inputWord)) {
                        setError('Already used this word!')
                        return
                    }
                    setError('')
                    setUsedWords([...usedWords, inputWord])
                    setScore(prev => prev + 1)
                    setInputWord('')
                    setTimeLeft(3)
                    setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                } else {
                    setError('Word must start with ' + letter)
                }
            } else {
                setError('Not a word :/')
            }
        }
    }

    return (
        <Stack spacing={10} sx={{ m: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p className='timer'>{timeLeft}</p>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 5, sm: 20 }}>
                <Typography variant='h2'>Score: {score}</Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant='h6'>Type a word that starts with</Typography>
                <Typography variant='h2' color='primary'>{letter}</Typography>
            </Stack>
            <StyledInput type="text" value={inputWord} InputLabelProps={{ shrink: true, }} variant="standard" autoFocus sx={{ width: '50%' }} onChange={e => setInputWord(e.target.value)} onKeyDown={handleWordSubmit} inputProps={{ style: { fontSize: 40 }, autoComplete: 'off' }} />
            <Typography variant='h6' color='red'>{error}</Typography>
            <StyledButton color='primary' variant='contained' sx={{ width: '20%' }} onClick={() => setPlaying(false)}>Back</StyledButton>
        </Stack>
    )
}

export default Game