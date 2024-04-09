import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeContextProvider } from './components/Contexts/DarkModeContext.jsx'
import { AuthContextProvider } from './components/Contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>

    <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
