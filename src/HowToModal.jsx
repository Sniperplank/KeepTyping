import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Stack, Typography } from '@mui/material'
import { ModalOverlay } from './styledComponents/ModalOverlay'
import { ModalContent } from './styledComponents/ModalContent'

function HowToModal({ open, onClose }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent>
                <Typography variant='h4'>How to Play</Typography>
                <Stack spacing={3} marginTop={2} marginBottom={2}>
                    <Typography variant='h6'>- When you start, a random letter will be generated</Typography>
                    <Typography variant='h6'>- You have 3 seconds to type a word that starts with the generated letter</Typography>
                    <Typography variant='h6'>- Once you type the word and hit 'Enter', you get 1 point and you have 3 seconds to type another word that starts with the last letter of the word you entered</Typography>
                    <Typography variant='h6'>- Keep going, typing words that start with the last letter of the previous word and see how many points you can get</Typography>
                </Stack>
                <Stack direction='row' spacing={2} marginTop={3} justifyContent='right'>
                    <Button variant='contained' color='error' onClick={onClose}>Close</Button>
                </Stack>
            </ModalContent>
        </>,
        document.getElementById('portal')
    )
}

export default HowToModal