import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUp';
import LogIn from './pages/LogIn';

import './index.less';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/log_in" element={<LogIn />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App;