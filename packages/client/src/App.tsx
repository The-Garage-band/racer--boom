import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import LogOutPage from './pages/LogOut';
import ProfilePage from './pages/Profile';
import GamePage from "./pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import ForumPage from "@/pages/ForumPage";
import ForumDialogPage from "@/pages/ForumDialogPage";
import { AudioSetup } from '@/components/AudioSetup/AudioSetup'
import {ErrorBoundaryComponent} from '@/components/ErrorBoundaryComponent';

import './index.less'

function App() {
  return (
    <>
      <ErrorBoundaryComponent>
        <header>
          <AudioSetup />
        </header>
        <Router>
          <Routes>
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="/log_in" element={<LogInPage />} />
            <Route path="/logout" element={<LogOutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/game" element={<GamePage health={2}/>} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:id" element={<ForumDialogPage />} />
            <Route path="/" element={<LogInPage />} />
          </Routes>
        </Router>
      </ErrorBoundaryComponent>
    </>
  )
}

export default App;
