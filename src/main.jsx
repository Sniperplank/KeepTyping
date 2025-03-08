import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ModeProvider } from './contexts/themeContext';
import { WordListProvider } from './contexts/wordListContext'
import { AnimalListProvider } from './contexts/animalsListContext'
import { CountryListProvider } from './contexts/countriesListContext'
import { PlantListProvider } from './contexts/plantsListContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <WordListProvider>
          <AnimalListProvider>
            <PlantListProvider>
              <CountryListProvider>
                <App />
              </CountryListProvider>
            </PlantListProvider>
          </AnimalListProvider>
        </WordListProvider>
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
