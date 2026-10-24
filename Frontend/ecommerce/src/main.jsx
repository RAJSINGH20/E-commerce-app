import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthDataContext } from './context/AuthDataContext.jsx'
import Usercontext from './context/Usercontext.jsx'
import ShopContanier from './context/ShopContanier.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthDataContext.Provider value={{ serverURL: "http://localhost:8000" }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Usercontext>
          <ShopContanier>
            <App />
          </ShopContanier>
        </Usercontext>
      </GoogleOAuthProvider>
    </AuthDataContext.Provider>
  </BrowserRouter>
)
