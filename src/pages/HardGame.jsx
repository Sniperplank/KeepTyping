import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'
import { useWordList } from '../contexts/wordListContext'
import { useNavigate } from 'react-router-dom'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setWordLength(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
        setScore(0)
        setUsedWords([])
        setError('')
        setTimeLeft(time)
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

    const handleWordSubmit = event => {
        if (event.keyCode === 13) { // Enter key was pressed
            if (wordList.includes(inputWord)) {
                if (inputWord.length === wordLength) {
                    if (inputWord.charAt(0).toUpperCase() == letter) {
                        if (usedWords.includes(inputWord)) {
                            setError('Already used this word!')
                            return
                        }
                        setError('')
                        setUsedWords([...usedWords, inputWord])
                        setScore(prev => prev + 1)
                        setInputWord('')
                        setTimeLeft(time)
                        setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                        setWordLength(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
                    } else {
                        setError('Word must start with ' + letter)
                    }
                } else {
                    setError(`Word must be ${wordLength} letters long!`)
                }
            } else {
                setError('Not a word :/')
            }
        }
    }

    return (
        <Stack spacing={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={5}>
                <Typography variant='h5'>Score: {score}</Typography>
                <Stack direction='row' spacing={2}>
                    <Typography variant='h3'>Type a </Typography>
                    <Typography variant='h3' color='primary'>{wordLength}</Typography>
                    <Typography variant='h3'>letter word that starts with</Typography>
                </Stack>
                <Typography variant='h2' color='primary'>{letter}</Typography>
            </Stack>
            <StyledInput type="text" value={inputWord} InputLabelProps={{ shrink: true, }} variant="standard" autoFocus sx={{ width: '50%' }} onChange={e => setInputWord(e.target.value)} onKeyDown={handleWordSubmit} inputProps={{ style: { fontSize: 40 }, autoComplete: 'off' }} />
            <Typography variant='h6' color='red'>{error}</Typography>
            <StyledButton color='error' variant='outlined' sx={{ width: '20%', color: 'text.main' }} onClick={() => { navigate(-1) }}>Back</StyledButton>
            <p className='timer'>{timeLeft}</p>
        </Stack>
    )
}

export default HardGame