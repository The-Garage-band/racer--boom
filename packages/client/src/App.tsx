import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  )
}

export default App;