import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.tsx'

createRoot(document.getElementById('root')).render(<Provider store={store} stabilityCheck="always"><App /></Provider>)
