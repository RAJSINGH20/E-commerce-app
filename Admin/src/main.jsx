import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import AuthContext from './Context/AuthCountext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContext>
            <App />
        </AuthContext>
=======

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
>>>>>>> fdeddd59e69d173203b5f8895a1c23359ea30fb5
    </BrowserRouter>
)
