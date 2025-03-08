import React, { createContext, useContext, useEffect, useState } from 'react'
import animalsFile from '../categories/animals.txt'

const AnimalsListContext = createContext()

export function useAnimalList() {
    return useContext(AnimalsListContext)
}

export function AnimalListProvider({ children }) {
    const [animalsList, setAnimalsList] = useState([])

    const value = {
        animalsList,
        setAnimalsList
    }

    useEffect(() => {
        // Read the text file and split the contents into an array of animal words
        fetch(animalsFile)
          .then(response => response.text())
          .then(text => setAnimalsList(text.split("\n").map(animal => animal.trim().toUpperCase())))
      }, [])

    return (
        <AnimalsListContext.Provider value={value}>
            {children}
        </AnimalsListContext.Provider>
    )
}
