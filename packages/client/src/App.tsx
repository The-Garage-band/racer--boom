import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import GamePage from "@/pages/GamePage";

import './index.less';
import {AudioService} from "@/services";
import {AudioSetup} from "@/components/AudioSetup/AudioSetup";

//@ts-ignore
window['audioService'] = AudioService.getInstance();

function App() {
  return (
      <>
        <header>
            <AudioSetup/>
        </header>
        <Router>
          <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/game" element={<GamePage health={2}/>} />
          </Routes>
        </Router>
      </>
  )
}

export default App;