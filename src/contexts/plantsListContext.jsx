import React, { createContext, useContext, useEffect, useState } from 'react'
import plantsFile from '../categories/plants.txt'

const PlantsListContext = createContext()

export function usePlantList() {
    return useContext(PlantsListContext)
}

export function PlantListProvider({ children }) {
    const [plantsList, setPlantsList] = useState([])

    const value = {
        plantsList,
        setPlantsList
    }

    useEffect(() => {
        // Read the text file and split the contents into an array of plant words
        fetch(plantsFile)
            .then(response => response.text())
            .then(text => setPlantsList(text.split("\n").map(plant => plant.trim().toUpperCase())))
    }, [])

    return (
        <PlantsListContext.Provider value={value}>
            {children}
        </PlantsListContext.Provider>
    )
}
