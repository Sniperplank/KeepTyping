import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { ModalOverlay } from '../styledComponents/ModalOverlay'
import { ModalContent } from '../styledComponents/ModalContent'
import { useTheme } from '../contexts/themeContext'
import { StyledButton } from '../styledComponents/StyledButton'
import { StyledIconButton } from '../styledComponents/StyledIconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import BugReportIcon from '@mui/icons-material/BugReport'
import InfoIcon from '@mui/icons-material/Info'
import AddIcon from '@mui/icons-material/Add'
import FileCopyIcon from '@mui/icons-material/FileCopy'

function MenuModal({ open, onClose }) {
    const { isDarkMode, setIsDarkMode } = useTheme()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ padding: { xs: 1, sm: '50px' }, left: 0, top: 0, height: '100%', width: { xs: '50%', sm: '10%' }, transform: 'translate(0)' }}>
                <Stack spacing={3} >
                    <Typography variant='h4' sx={{ mb: 5 }}>KeepTyping</Typography>
                    <Stack spacing={2} >
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main', textTransform: 'none', justifyContent: 'flex-start' }} startIcon={<FileCopyIcon />} onClick={() => openInNewTab('https://github.com/Sniperplank/KeepTyping/tree/main/src/categories')}>Categories Files</StyledButton>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main', textTransform: 'none', justifyContent: 'flex-start' }} startIcon={<AddIcon />}>Add a Word</StyledButton>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main', textTransform: 'none', justifyContent: 'flex-start' }} startIcon={<BugReportIcon />}>Report a bug</StyledButton>
                        <StyledButton variant='outlined' color='primary' sx={{ color: 'text.main', textTransform: 'none', justifyContent: 'flex-start' }} startIcon={<InfoIcon />} onClick={() => openInNewTab('https://github.com/Sniperplank')}>About Me</StyledButton>
                    </Stack>
                    <Stack spacing={2} sx={{ borderTop: 'solid', borderColor: 'text.main', pt: '10px' }}>
                        <StyledIconButton onClick={() => { setIsDarkMode(prev => !prev) }} sx={{ alignSelf: 'center' }}>
                            {isDarkMode ? <LightModeIcon color={'primary'} /> : <ModeNightIcon color={'primary'} />}
                        </StyledIconButton>
                        <StyledButton variant='contained' color='primary'>Sign In</StyledButton>
                    </Stack>
                </Stack>
                <Button variant='outlined' color='error' onClick={onClose} sx={{ position: 'absolute', bottom: '150px', height: 40, color: 'text.main' }}>Close</Button>
            </ModalContent>
        </>,
        document.getElementById('menu')
    )
}

export default MenuModal