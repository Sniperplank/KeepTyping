import React, { useState, useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import { StyledInput } from './StyledInput'
import typingsound from '../sounds/typingsound.mp3'
import { useVolume } from '../contexts/volumeContext'

const CharacterInput = ({ length, onChange, value = '', disabled = false, handleWordSubmit }) => {
    const [chars, setChars] = useState(Array(length).fill(''))
    const inputRefs = useRef([])
    const typingAudioRef = useRef(null)
    const { isVolumeOn, setIsVolumeOn } = useVolume()

    useEffect(() => {
        const typingAudio = new Audio(typingsound)
        typingAudio.preload = 'auto'
        typingAudioRef.current = typingAudio
        return () => {
            if (typingAudioRef.current) {
                typingAudioRef.current.pause()
                typingAudioRef.current = null
            }
        }
    }, [])

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    // Update chars when external value changes
    useEffect(() => {
        const newChars = value.split('').concat(Array(length).fill('')).slice(0, length)
        setChars(newChars)
    }, [value, length])

    // Focus the first input box when the component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [length])

    const handleChange = (index, value) => {
        const newChars = [...chars]
        // Only take the first character
        newChars[index] = value.slice(0, 1)
        setChars(newChars)

        // Move to next input if this one is filled and not the last
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }

        // Call parent onChange with full string
        if (onChange) {
            onChange(newChars.join(''))
        }
    }

    const handleKeyDown = (index, e) => {
        // Play sound only for alphanumeric keys (letters and numbers)
        const isAlphanumeric = /^[a-zA-Z0-9]$/.test(e.key)

        if (isAlphanumeric && typingAudioRef.current && isVolumeOn) {
            typingAudioRef.current.currentTime = 0
            typingAudioRef.current.play().catch(e => console.error("Error playing 'typing' audio:", e))
        }

        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !chars[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }

        // Pass keydown event to parent when Enter is pressed
        if (e.key === 'Enter') {
            // Reset the input boxes and focus the first one
            setChars(Array(length).fill(''))
            inputRefs.current[0].focus()
        }
    }

    return (
        <form onSubmit={handleWordSubmit}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                {Array.from({ length }).map((_, index) => (
                    <StyledInput
                        key={index}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        value={chars[index] || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: 'center',
                                padding: '0',
                                width: '70px',
                                height: '70px',
                                fontSize: '28px',
                                fontWeight: 'bold'
                            }
                        }}
                        disabled={disabled}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        variant="outlined"
                    />
                ))}
                <button type="submit" style={{ display: 'none' }}>Submit</button>
            </Box>
        </form>
    )
}

export default CharacterInput 