// frontend/src/main.jsx (or main.js)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contest/authcontext.jsx' // <-- IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- WRAP APP */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)