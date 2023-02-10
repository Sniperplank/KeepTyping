import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true)

    const value = {
        isDarkMode,
        setIsDarkMode
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
