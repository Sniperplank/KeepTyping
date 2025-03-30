import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { ModalOverlay } from '../styledComponents/ModalOverlay'
import { ModalContent } from '../styledComponents/ModalContent'
import { useTheme } from '../contexts/themeContext'
import { StyledButton } from '../styledComponents/StyledButton'

function MenuModal({ open, onClose }) {
    const { isDarkMode, setIsDarkMode } = useTheme()

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ padding: { xs: 1, sm: '50px' }, left: 0, top: 0, height: '100%', transform: 'translate(0)' }}>
                <Stack spacing={3}>
                    <Typography variant='h4' sx={{ mb: 5 }}>KeepTyping</Typography>
                    <Stack spacing={2}>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main' }} onClick={() => openInNewTab('https://github.com/Sniperplank/KeepTyping/tree/main/src/categories')}>Categories Files</StyledButton>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main' }}>Credit</StyledButton>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main' }}>Report a bug</StyledButton>
                    </Stack>
                </Stack>
                <Button variant='contained' color='primary' onClick={onClose} sx={{ position: 'absolute', bottom: '150px', height: 40 }}>Close</Button>
            </ModalContent>
        </>,
        document.getElementById('menu')
    )
}

export default MenuModal