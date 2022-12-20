import React, { useEffect, useState  } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import SignUpPage from '@/pages/SignUpPage'
import LogInPage from '@/pages/LogInPage'
import LogOutPage from '@/pages/LogOutPage'
import ProfilePage from '@/pages/ProfilePage'
import GamePage from '@/pages/GamePage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import ForumPage from '@/pages/ForumPage'
import HomePage from '@/pages/HomePage'
import ForumDialogPage from '@/pages/ForumDialogPage'
import NotFoundPage from '@/pages/NotFoundPage'
import EndGamePage from '@/pages/EndGamePage'
import OAuthPage from '@/pages/OAuthPage'

import Loader from '@/pages/Loader'
import { AudioSetup } from '@/components/AudioSetup/AudioSetup'
import { ErrorBoundaryComponent } from '@/components/ErrorBoundaryComponent'
import ProtectedRoute from '@/components/ProtectedRoute'
import AlertStack from '@/components/AlertStack'
import { FullscreenButtonComponent } from '@/components/FullscreenButtonComponent/FullscreenButtonComponent'

import fetchUser, { getUserData } from '@/store/slices/GetUserSlice'

import { themeDefault, lightTheme } from '@/theme'
import { ThemeProvider } from '@mui/material/styles'

import '@/styles/themes.less'

import { useAppDispatch, useAppSelector } from '@/hooks'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, isLoading } = useAppSelector(getUserData);

  const defaultTheme = localStorage.getItem("racer--boom-theme");
  const [theme, setTheme] = useState(defaultTheme);

  setDataTheme(theme);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setDataTheme(theme);
  }

  function setDataTheme(theme: string | null){
    if (theme){
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("racer--boom-theme", theme);
    }
  }

  useEffect(() => {
    dispatch(fetchUser()).then(({ payload }) => {
      if (!payload.id) {
        navigate('/log_in')
      }
    })
  }, [data.id])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : themeDefault}>
      <ErrorBoundaryComponent>
        <AlertStack />
        <header>
          {/* <AudioSetup /> */}
          <button className={'select-theme ' + theme} onClick={toggleTheme}>Переключить тему</button>
        </header>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isAllowed={!data.id}
                isLoading={isLoading}
                redirectPath="/home"
              />
            }>
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="/log_in" element={<LogInPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAllowed={!!data.id}
                isLoading={isLoading}
                redirectPath="/log_in"
              />
            }>
            <Route path="/logout" element={<LogOutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/game" element={<GamePage health={3} />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:id" element={<ForumDialogPage />} />
            <Route path="/end-game" element={<EndGamePage />} />
          </Route>
          <Route path="/" element={<Loader />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/oauth" element={<OAuthPage />} />
        </Routes>
        <footer>
          <FullscreenButtonComponent/>
        </footer>
        <AlertStack />
      </ErrorBoundaryComponent>
    </ThemeProvider>
  )
}

export default App
