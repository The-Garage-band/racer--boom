import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import themeDefault from './theme';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={themeDefault}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
