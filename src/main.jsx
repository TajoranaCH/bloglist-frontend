import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import React from 'react'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}>
<App /></Provider>)