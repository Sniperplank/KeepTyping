import React, { createContext, useContext, useEffect, useState } from 'react'
import wordsFile from '../categories/words_alpha.txt'

const WordListContext = createContext()

export function useWordList() {
    return useContext(WordListContext)
}

export function WordListProvider({ children }) {
    const [wordList, setWordList] = useState([])

    const value = {
        wordList,
        setWordList
    }

    useEffect(() => {
        // Read the text file and split the contents into an array of words
        fetch(wordsFile)
          .then(response => response.text())
          .then(text => setWordList(text.split("\n").map(word => word.trim().toUpperCase())))
      }, [])

    return (
        <WordListContext.Provider value={value}>
            {children}
        </WordListContext.Provider>
    )
}
