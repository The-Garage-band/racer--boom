import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import GamePage from "./pages/GamePage";

import './index.less';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/game" element={<GamePage/>} />
      </Routes>
    </Router>
  )
}

export default App;