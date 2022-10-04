import { useEffect } from 'react'
import Button from '@mui/material/Button'
import './App.css'
import {GamePage} from "./pages/GamePage";

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <GamePage w={100}/>
}

export default App;