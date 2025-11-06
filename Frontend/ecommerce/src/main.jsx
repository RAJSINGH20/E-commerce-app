import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthDataContext } from './context/Authcontext.jsx'
import Usercontext from './context/Usercontext.jsx'
import ShopContanier from './context/ShopContanier.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthDataContext.Provider value={{ serverURL: "http://localhost:8000" }}>
      <Usercontext>
        <ShopContanier>
          <App />
        </ShopContanier>
      </Usercontext>
    </AuthDataContext.Provider>
  </BrowserRouter>
)
