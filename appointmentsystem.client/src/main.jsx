import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../appointment-system-frontend/src/index.css'
import App from "../appointment-system-frontend/src/App"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
