import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // Certifique-se de que está importando o App!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Ele precisa renderizar o App aqui */}
  </StrictMode>,
)