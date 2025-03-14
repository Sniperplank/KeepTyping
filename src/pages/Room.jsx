import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import socket from '../socketService'

function Room() {
    const { roomCode } = useParams()
    const [searchParams] = useSearchParams()
    const [mode, setMode] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!roomCode) return  // Prevents undefined room codes

        const selectedMode = searchParams.get('mode')
        setMode(selectedMode)

        socket.emit("joinRoom", { roomCode })

        const handleStartGame = (gameMode) => {
            console.log(`Game started in ${gameMode} mode!`)
            const path = gameMode === 'quick' ? '/quick-game' : '/hard-game'
            navigate(path)
        }

        const handleWaiting = (message) => {
            console.log(message)
        }

        const handleError = (message) => {
            console.error(message)
        }

        socket.on("startGame", handleStartGame)
        socket.on("waiting", handleWaiting)
        socket.on("error", handleError)

        // Cleanup to prevent multiple listeners
        return () => {
            socket.off("startGame", handleStartGame)
            socket.off("waiting", handleWaiting)
            socket.off("error", handleError)
        }
    }, [roomCode, searchParams])

    return (
        <div>
            <h1>Waiting for another player...</h1>
            {/* Add a countdown before the game starts */}
            <p>Room Code: {roomCode}</p>
            <p>Game Mode: {mode}</p>
        </div>
    )
}

export default Room