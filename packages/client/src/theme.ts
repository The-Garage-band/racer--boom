import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: 'rgba(21, 255, 241, 1)',
      },
      secondary: {
        main: '#ffffff',
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
        disabled: 'rgba(255,255,255,0.38)',
      },
      background: {
        default: '#141E30',
        paper: '#141E30',
      },
    },
    shape: {
      borderRadius: 8,
    },
  })
)
