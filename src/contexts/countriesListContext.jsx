import React, { createContext, useContext, useEffect, useState } from 'react'
import countriesFile from '../categories/countries.txt'

const CountriesListContext = createContext()

export function useCountryList() {
    return useContext(CountriesListContext)
}

export function CountryListProvider({ children }) {
    const [countriesList, setCountriesList] = useState([])

    const value = {
        countriesList,
        setCountriesList
    }

    useEffect(() => {
        // Read the text file and split the contents into an array of country words
        fetch(countriesFile)
            .then(response => response.text())
            .then(text => setCountriesList(text.split("\n").map(country => country.trim().toUpperCase())))
    }, [])

    return (
        <CountriesListContext.Provider value={value}>
            {children}
        </CountriesListContext.Provider>
    )
}
