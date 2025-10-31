import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import AuthContext from './Context/AuthCountext.jsx'
import Admincontext from './Context/Admincontext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContext>
            <Admincontext>
                <App />
            </Admincontext>
        </AuthContext>
    </BrowserRouter>
)
