import { useState, useEffect } from 'react'
import { Stack, Typography, ThemeProvider, TextField } from '@mui/material'
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useTheme } from './contexts/themeContext';
import './App.css'
import { StyledButton } from './styledComponents/StyledButton';
import HowToModal from './howToModal';
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
  const [randomLetter, setRandomLetter] = useState('')
  const [inputWord, setInputWord] = useState("");
  const [wordList, setWordList] = useState([]);
  useEffect(() => {
    setRandomLetter(letters[Math.floor(Math.random() * letters.length)])
  }, [playing])

  useEffect(() => {
    // Read the text file and split the contents into an array of words
    fetch(wordsFile)
      .then(response => response.text())
      .then(text => setWordList(text.split("\r\n")));
  }, []);

  const handleWordSubmit = event => {
    if (event.keyCode === 13) {
      // Enter key was pressed
      console.log(wordList.includes(inputWord));
      console.log(wordList);
      console.log(inputWord);
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
            <StyledButton color='primary' variant='contained' onClick={() => setPlaying(true)}>Play</StyledButton>
          </Stack>
        </Stack>
      }
      {
        playing &&
        <Stack spacing={10} sx={{ m: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack direction={'row'} spacing={20}>
            <Typography variant='h2'>Timer: </Typography>
            <Typography variant='h2'>Score: {score}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant='h6'>Type a word that starts with</Typography>
            <Typography variant='h2' color='primary'>{randomLetter}</Typography>
          </Stack>
          <StyledInput type="text" InputLabelProps={{ shrink: true, }} variant="standard" autoFocus sx={{ width: '50%' }} onChange={e => setInputWord(e.target.value)} onKeyDown={handleWordSubmit} inputProps={{ style: { fontSize: 40 }, autoComplete: 'off' }} />
          <StyledButton color='primary' variant='contained' sx={{ width: '20%' }} onClick={() => setPlaying(false)}>Back</StyledButton>
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
