import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, Stack, Typography } from '@mui/material'
import { ModalOverlay } from '../styledComponents/ModalOverlay'
import { ModalContent } from '../styledComponents/ModalContent'
import { useTheme } from '../contexts/themeContext'

function MenuModal({ open, onClose }) {
    const { isDarkMode, setIsDarkMode } = useTheme()

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ padding: { xs: 1, sm: '50px' }, left: { xs: 0, sm: '50%' }, top: { xs: 0, sm: '50%' }, transform: { xs: 'translate(0)', sm: 'translate(-50%, -50%)' } }}>
                <Stack spacing={5}>
                    <Typography variant='h4' sx={{ mb: 5 }}>KeepTyping</Typography>

                    <Typography variant='h6'>Type fast, think faster, and KEEP TYPING. Ready to play?</Typography>
                </Stack>
                <Stack direction='row' spacing={2} marginTop={3} justifyContent='right'>
                    <Button variant='contained' color='primary' onClick={onClose}>Close</Button>
                </Stack>
            </ModalContent>
        </>,
        document.getElementById('menu')
    )
}

export default MenuModal