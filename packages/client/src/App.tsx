import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';

import './index.less';

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