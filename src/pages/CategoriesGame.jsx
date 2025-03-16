import { Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'
import { useNavigate } from 'react-router-dom'
import { useAnimalList } from '../contexts/animalsListContext'
import { useCountryList } from '../contexts/countriesListContext'
import { usePlantList } from '../contexts/plantsListContext'
import { useColorList } from '../contexts/colorsListContext'
import typingsound from '../sounds/typingsound.mp3'
import correctsound from '../sounds/correct.mp3'
import wrongsound from '../sounds/wrong.mp3'
import { useVolume } from '../contexts/volumeContext'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const time = 10
const categories = ['Animal', 'Plant', 'Country', 'Color']

function CategoriesGame() {
    const [usedWords, setUsedWords] = useState([])
    const [timeLeft, setTimeLeft] = useState(time)
    const [score, setScore] = useState(0)
    const [letter, setLetter] = useState('')
    const [inputWord, setInputWord] = useState("")
    const [error, setError] = useState('')
    const { animalsList, setAnimalsList } = useAnimalList()
    const { countriesList, setCountriesList } = useCountryList()
    const { plantsList, setPlantsList } = usePlantList()
    const { colorsList, setColorsList } = useColorList()
    const [chosenCategory, setChosenCategory] = useState('')
    const navigate = useNavigate()
    const { isVolumeOn, setIsVolumeOn } = useVolume()

    const typingAudioRef = useRef(null)
    const correctAudioRef = useRef(null)
    const wrongAudioRef = useRef(null)

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
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

    const handleWordSubmit = event => {
        // Play sound only for alphanumeric keys (letters and numbers)
        const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key)

        if (isAlphanumeric && typingAudioRef.current && isVolumeOn) {
            typingAudioRef.current.currentTime = 0
            typingAudioRef.current.play().catch(e => console.error("Error playing 'typing' audio:", e))
        }

        if (event.keyCode === 13) { // Enter key was pressed
            switch (chosenCategory.toUpperCase()) {
                case 'ANIMAL':
                    if (animalsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                if (wrongAudioRef.current && isVolumeOn) {
                                    wrongAudioRef.current.currentTime = 0
                                    wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                                }
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                            if (correctAudioRef.current && isVolumeOn) {
                                correctAudioRef.current.currentTime = 0
                                correctAudioRef.current.play().catch(e => console.error("Error playing 'correct' audio:", e))
                            }
                        } else {
                            setError('Word must include the letter ' + letter)
                            if (wrongAudioRef.current && isVolumeOn) {
                                wrongAudioRef.current.currentTime = 0
                                wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                            }
                        }
                    } else {
                        setError('Not an animal :/')
                        if (wrongAudioRef.current && isVolumeOn) {
                            wrongAudioRef.current.currentTime = 0
                            wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                        }
                    }
                    break;
                case 'COUNTRY':
                    if (countriesList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                if (wrongAudioRef.current && isVolumeOn) {
                                    wrongAudioRef.current.currentTime = 0
                                    wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                                }
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                            if (correctAudioRef.current && isVolumeOn) {
                                correctAudioRef.current.currentTime = 0
                                correctAudioRef.current.play().catch(e => console.error("Error playing 'correct' audio:", e))
                            }
                        } else {
                            setError('Word must include the letter ' + letter)
                            if (wrongAudioRef.current && isVolumeOn) {
                                wrongAudioRef.current.currentTime = 0
                                wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                            }
                        }
                    } else {
                        setError('Not a country :/')
                        if (wrongAudioRef.current && isVolumeOn) {
                            wrongAudioRef.current.currentTime = 0
                            wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                        }
                    }
                    break;
                case 'PLANT':
                    if (plantsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                if (wrongAudioRef.current && isVolumeOn) {
                                    wrongAudioRef.current.currentTime = 0
                                    wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                                }
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                            if (correctAudioRef.current && isVolumeOn) {
                                correctAudioRef.current.currentTime = 0
                                correctAudioRef.current.play().catch(e => console.error("Error playing 'correct' audio:", e))
                            }
                        } else {
                            setError('Word must include the letter ' + letter)
                            if (wrongAudioRef.current && isVolumeOn) {
                                wrongAudioRef.current.currentTime = 0
                                wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                            }
                        }
                    } else {
                        setError('Not a plant :/')
                        if (wrongAudioRef.current && isVolumeOn) {
                            wrongAudioRef.current.currentTime = 0
                            wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                        }
                    }
                    break;
                case 'COLOR':
                    if (colorsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                if (wrongAudioRef.current && isVolumeOn) {
                                    wrongAudioRef.current.currentTime = 0
                                    wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                                }
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                            if (correctAudioRef.current && isVolumeOn) {
                                correctAudioRef.current.currentTime = 0
                                correctAudioRef.current.play().catch(e => console.error("Error playing 'correct' audio:", e))
                            }
                        } else {
                            setError('Word must include the letter ' + letter)
                            if (wrongAudioRef.current && isVolumeOn) {
                                wrongAudioRef.current.currentTime = 0
                                wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                            }
                        }
                    } else {
                        setError('Not a color :/')
                        if (wrongAudioRef.current && isVolumeOn) {
                            wrongAudioRef.current.currentTime = 0
                            wrongAudioRef.current.play().catch(e => console.error("Error playing 'wrong' audio:", e))
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <Stack spacing={{ xs: 5, sm: 10 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={5}>
                <Typography variant='h5'>Score: {score}</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>Type {chosenCategory === 'Animal' ? 'an' : 'a'} </Typography>
                    <Typography variant='h3' color='primary'>{chosenCategory.toUpperCase()}</Typography>
                    <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 50 } }}>name that includes the letter</Typography>
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

export default CategoriesGame