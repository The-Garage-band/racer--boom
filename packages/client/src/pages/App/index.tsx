import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import SignUpPage from '@/pages/SignUp';
import LogInPage from '@/pages/LogIn';
import LogOutPage from '@/pages/LogOut';
import ProfilePage from '@/pages/Profile';
import GamePage from "@/pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import ForumPage from "@/pages/ForumPage";
import HomePage from "@/pages/HomePage";
import ForumDialogPage from "@/pages/ForumDialogPage";
import { AudioSetup } from '@/components/AudioSetup/AudioSetup';
import {ErrorBoundaryComponent} from '@/components/ErrorBoundaryComponent';
import ProtectedRoute from '@/components/ProtectedRoute';

import fetchUser, { getUserData } from '@/store/slices/GetUserSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

const App = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getUserData);

  useEffect(() => {
    dispatch(fetchUser()).then(({ payload }) => {
      if (!payload.id) {
        navigate('/log_in');
      }
    });
  }, []);

  return (
    <ErrorBoundaryComponent>
      <header>
        <AudioSetup />
      </header>
      <Routes>
        <Route path="/sign_up" element={<SignUpPage />} />
        {/* <Route path="/log_in" element={<LogInPage />} /> */}
        <Route
          path="log_in"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={ !data.id }
            >
              <LogInPage />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage health={3}/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:id" element={<ForumDialogPage />} />
        <Route path="/" element={<LogInPage />} />
      </Routes>
    </ErrorBoundaryComponent>
  );
};

export default App;
