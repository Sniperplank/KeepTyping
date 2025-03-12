import React, { createContext, useContext, useState } from 'react'

const VolumeContext = createContext()

export function useVolume() {
    return useContext(VolumeContext)
}

export function VolumeProvider({ children }) {
    const [isVolumeOn, setIsVolumeOn] = useState(true)

    const value = {
        isVolumeOn,
        setIsVolumeOn
    }

    return (
        <VolumeContext.Provider value={value}>
            {children}
        </VolumeContext.Provider>
    )
}
