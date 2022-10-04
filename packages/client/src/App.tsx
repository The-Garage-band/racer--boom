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
  return (
      <div className="App">
        <Button variant="contained">Hello World</Button>
        <GamePage w={100}/>
      </div>
  )
}

export default App;