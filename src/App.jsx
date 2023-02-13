import { useState, useEffect } from 'react'
import { Stack, Typography, ThemeProvider, TextField } from '@mui/material'
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useTheme } from './contexts/themeContext';
import './App.css'
import { StyledButton } from './styledComponents/StyledButton';
import HowToModal from './HowToModal';
import { StyledIconButton } from './styledComponents/StyledIconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { StyledInput } from './styledComponents/StyledInput';
import wordsFile from './words_alpha.txt'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function App() {
  const [isHTPModalOpen, setIsHTPModalOpen] = useState(false)
  const { isDarkMode, setIsDarkMode } = useTheme()
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [letter, setLetter] = useState('')
  const [inputWord, setInputWord] = useState("")
  const [error, setError] = useState('')
  const [wordList, setWordList] = useState([])
  const [usedWords, setUsedWords] = useState([])
  const [timeLeft, setTimeLeft] = useState(3)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    let timerId;
    if (timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setGameOver(true);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft, playing]);

  useEffect(() => {
    setLetter(letters[Math.floor(Math.random() * letters.length)])
    setScore(0)
    setUsedWords([])
    setError('')
    setTimeLeft(3)
  }, [playing])

  useEffect(() => {
    // Read the text file and split the contents into an array of words
    fetch(wordsFile)
      .then(response => response.text())
      .then(text => setWordList(text.split("\r")));
  }, []);

  const handleWordSubmit = event => {
    if (event.keyCode === 13) { // Enter key was pressed
      console.log(wordList)
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
  };

  document.body.style.backgroundColor = isDarkMode ? '#171717' : '#fafafa'
  document.body.style.color = isDarkMode ? '#b6b4b4' : '#3b3b3b'
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {
        !playing &&
        <Stack>
          <Typography variant='h2' color='primary'>KeepTyping</Typography>
          <Stack spacing={10} sx={{ m: 10 }}>
            <StyledButton color='primary' variant='contained' onClick={() => setIsHTPModalOpen(true)}>How to play</StyledButton>
            <StyledButton color='primary' variant='contained'
              onClick={() => {
                setPlaying(true)
                setGameOver(false)
                setTimeLeft(3)
                setInputWord('')
              }}>Play</StyledButton>
          </Stack>
        </Stack>
      }
      {
        (playing && !gameOver) &&
        <Stack spacing={10} sx={{ m: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 5, sm: 20 }}>
            <Typography variant='h2'>Timer: {timeLeft}</Typography>
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
      }
      {
        (playing && gameOver) &&
        <Stack spacing={10} sx={{ m: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={10}>
            <Typography variant='h2' color='error'>Time is up!</Typography>
            <Typography variant='h2'>Your score was<Typography variant='h2' color='primary'>{score}</Typography></Typography>
          </Stack>
          <StyledButton color='primary' variant='contained' sx={{ width: '20%' }}
            onClick={() => {
              setGameOver(false)
              setPlaying(false)
            }}>Home</StyledButton>
        </Stack>
      }
      <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }}>
        {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
      </StyledIconButton>
      <HowToModal open={isHTPModalOpen} onClose={() => setIsHTPModalOpen(false)} />
    </ThemeProvider>
  )
}

export default App
