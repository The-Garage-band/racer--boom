import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import GamePage from "@/pages/GamePage";

import './index.less';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/log_in" element={<LogInPage />} />
        <Route path="/game" element={<GamePage health={2}/>} />
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  )
}

export default App;