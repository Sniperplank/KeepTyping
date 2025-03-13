import React from 'react'
import ReactDOM from 'react-dom'
import { ModalOverlay } from './styledComponents/ModalOverlay'
import { ModalContent } from './styledComponents/ModalContent'
import { Button, Stack, Typography } from '@mui/material'
import { StyledButton } from './styledComponents/StyledButton'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ShapeLineIcon from '@mui/icons-material/ShapeLine'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import socket from './socketService'

function OnlineModeModal({ open, onClose }) {
    const navigate = useNavigate()

    const createRoom = (mode) => {
        const roomCode = uuidv4()  // Unique room code
        socket.emit("createRoom", { roomCode, mode })
        navigate(`/room/${roomCode}?mode=${mode}`) // Redirect to the game room
    }

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent sx={{ padding: { xs: 1, sm: '50px' }, left: { xs: 0, sm: '50%' }, top: { xs: 0, sm: '50%' }, transform: { xs: 'translate(0)', sm: 'translate(-50%, -50%)' } }}>
                <Stack spacing={5}>
                    <Typography variant='h5'>Choose Game Mode</Typography>
                    <StyledButton variant='contained' startIcon={<RocketLaunchIcon />} onClick={() => createRoom('quick')}>Quick Match</StyledButton>
                    <StyledButton variant='contained' startIcon={<ShapeLineIcon />} onClick={() => createRoom('turn-based')}>Turn-Based Match</StyledButton>
                </Stack>
                <Stack direction='row' spacing={2} marginTop={3} justifyContent='right'>
                    <Button variant='contained' color='error' onClick={onClose}>Cancel</Button>
                </Stack>
            </ModalContent>
        </>,
        document.getElementById('onlineMode')
    )
}

export default OnlineModeModal  