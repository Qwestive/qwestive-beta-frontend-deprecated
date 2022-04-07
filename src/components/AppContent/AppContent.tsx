import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import OnlyAuthRoute from 'components/Authentication/OnlyAuthRoute';
import Spinner from 'components/Util/Spinner';
import Navbar from 'components/Navbar/Navbar';
import useDarkMode from 'components/Util/useDarkMode';
import { loadingAppAtom } from 'services/recoil/appState';

import HomePage from 'pages/Home/HomePage';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';
import ProfileSettingPage from 'pages/UserProfile/SelfProfile/ProfileSettingPage';
import CommunityPage from 'pages/Community/CommunityPage';
import CreateCommunityPage from 'pages/CreateCommunity/CreateCommunityPage';
import NotFoundPage from 'pages/Common/NotFoundPage';
import LoginPage from 'pages/Common/LoginPage';

import 'style/global.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AppContent(): JSX.Element {
  useDarkMode();
  const loadingApp = useRecoilValue(loadingAppAtom);
  return (
    <>
      {loadingApp && (
        <div className="w-screen h-full overflow-hidden ">
          <Spinner classExtend="h-28 w-28 mt-24 m-auto text-indigo-500" />
        </div>
      )}
      {!loadingApp && (
        <>
          <Navbar />
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/user/:userName" element={<UserProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile/settings"
              element={<OnlyAuthRoute element={<ProfileSettingPage />} />}
            />
            <Route
              path="/c/:cId"
              element={<OnlyAuthRoute element={<CommunityPage />} />}
            />

            <Route
              path="/new-community"
              element={<OnlyAuthRoute element={<CreateCommunityPage />} />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </>
  );
}
