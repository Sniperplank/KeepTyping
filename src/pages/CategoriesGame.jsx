import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledInput } from '../styledComponents/StyledInput'
import { useWordList } from '../contexts/wordListContext'
import { useNavigate } from 'react-router-dom'
import { useAnimalList } from '../contexts/animalsListContext'
import { useCountryList } from '../contexts/countriesListContext'
import { usePlantList } from '../contexts/plantsListContext'
import { useColorList } from '../contexts/colorsListContext'

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
    // const { wordList, setWordList } = useWordList()
    const { animalsList, setAnimalsList } = useAnimalList()
    const { countriesList, setCountriesList } = useCountryList()
    const { plantsList, setPlantsList } = usePlantList()
    const { colorsList, setColorsList } = useColorList()
    const [chosenCategory, setChosenCategory] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setLetter(letters[Math.floor(Math.random() * letters.length)])
        setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
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
            switch (chosenCategory.toUpperCase()) {
                case 'ANIMAL':
                    if (animalsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                        } else {
                            setError('Word must include the letter ' + letter)
                        }
                    } else {
                        setError('Not an animal :/')
                    }
                    break;
                case 'COUNTRY':
                    if (countriesList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                        } else {
                            setError('Word must include the letter ' + letter)
                        }
                    } else {
                        setError('Not a country :/')
                    }
                    break;
                case 'PLANT':
                    if (plantsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                        } else {
                            setError('Word must include the letter ' + letter)
                        }
                    } else {
                        setError('Not a plant :/')
                    }
                    break;
                case 'COLOR':
                    if (colorsList.includes(inputWord.toUpperCase())) {
                        if (inputWord.toUpperCase().includes(letter)) {
                            if (usedWords.includes(inputWord.toUpperCase())) {
                                setError('Already used this word!')
                                return
                            }
                            setError('')
                            setUsedWords([...usedWords, inputWord.toUpperCase()])
                            setScore(prev => prev + 1)
                            setInputWord('')
                            setTimeLeft(time)
                            setLetter(inputWord.charAt(inputWord.length - 1).toUpperCase())
                            setChosenCategory(categories[Math.floor(Math.random() * categories.length)])
                        } else {
                            setError('Word must include the letter ' + letter)
                        }
                    } else {
                        setError('Not a color :/')
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