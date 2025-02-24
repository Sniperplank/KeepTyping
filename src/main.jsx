import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ModeProvider } from './contexts/themeContext';
import { WordListProvider } from './contexts/wordListContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <WordListProvider>
          <App />
        </WordListProvider>
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
