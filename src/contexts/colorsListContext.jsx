import React, { createContext, useContext, useEffect, useState } from 'react'
import colorsFile from '../categories/colors.txt'

const ColorsListContext = createContext()

export function useColorList() {
    return useContext(ColorsListContext)
}

export function ColorListProvider({ children }) {
    const [colorsList, setColorsList] = useState([])

    const value = {
        colorsList,
        setColorsList
    }

    useEffect(() => {
        // Read the text file and split the contents into an array of color words
        fetch(colorsFile)
          .then(response => response.text())
          .then(text => setColorsList(text.split("\n").map(color => color.trim().toUpperCase())))
      }, [])

    return (
        <ColorsListContext.Provider value={value}>
            {children}
        </ColorsListContext.Provider>
    )
}
