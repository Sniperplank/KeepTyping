import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material'
import { ModalOverlay } from '../styledComponents/ModalOverlay'
import { ModalContent } from '../styledComponents/ModalContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme } from '../contexts/themeContext'

function HowToModal({ open, onClose }) {
    const [expanded, setExpanded] = useState('panel1')
    const { isDarkMode, setIsDarkMode } = useTheme()

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ padding: { xs: 1, sm: '50px' }, left: { xs: 0, sm: '50%' }, top: { xs: 0, sm: '50%' }, transform: { xs: 'translate(0)', sm: 'translate(-50%, -50%)' } }}>
                <Stack spacing={5}>
                    <Typography variant='h4' sx={{ mb: 5 }}>How to Play</Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ backgroundColor: isDarkMode ? '#171717' : '#fafafa', color: 'text.main' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon color='primary' />} aria-controls="panel1-content" id="panel1-header">
                            <Typography component="span" variant='h5' sx={{ fontWeight: 'bold' }}>Quick Game</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li><Typography variant='h6'>Start with a random letter.</Typography></li>
                                <li><Typography variant='h6'>Type a word that begins with the displayed letter and press Enter.</Typography></li>
                                <li><Typography variant='h6'>Your next word must start with the last letter of your previous word.</Typography></li>
                                <li><Typography variant='h6'>Keep going to build up the longest train of words!</Typography></li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ backgroundColor: isDarkMode ? '#171717' : '#fafafa', color: 'text.main' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon color='primary' />} aria-controls="panel2-content" id="panel2-header">
                            <Typography component="span" variant='h5' sx={{ fontWeight: 'bold' }}>Hard Game</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li><Typography variant='h6'>Just like Quick Game, but with an extra challenge!</Typography></li>
                                <li><Typography variant='h6'>Each word must contain a required number of letters.</Typography></li>
                                <li><Typography variant='h6'>Stay sharp and think carefully to keep your streak alive!</Typography></li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ backgroundColor: isDarkMode ? '#171717' : '#fafafa', color: 'text.main' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon color='primary' />} aria-controls="panel3-content" id="panel3-header">
                            <Typography component="span" variant='h5' sx={{ fontWeight: 'bold' }}>Categories Game</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li><Typography variant='h6'>You'll be given a category and a required letter.</Typography></li>
                                <li><Typography variant='h6'>Enter words that fit the category and include the required letter.</Typography></li>
                                <li><Typography variant='h6'>Words don't have to start with the letter, but they must include it.</Typography></li>
                                <li><Typography variant='h6'>Each correct word earns a point—how many can you get?</Typography></li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Typography variant='h6'>Type fast, think faster, and KEEP TYPING. Ready to play?</Typography>
                </Stack>
                <Stack direction='row' spacing={2} marginTop={3} justifyContent='right'>
                    <Button variant='contained' color='primary' onClick={onClose}>Ready</Button>
                </Stack>
            </ModalContent>
        </>,
        document.getElementById('howToPlay')
    )
}

export default HowToModal