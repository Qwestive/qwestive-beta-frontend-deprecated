import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import WalletProviders from 'components/Solana/SolanaWallet/WalletProviders';
import AuthManager from 'components/Authentication/AuthManager';
import OnlyAuthRoute from 'components/Authentication/OnlyAuthRoute';
import { TokenRegistryProvider } from 'components/Solana/TokenRegistry';

import Navbar from 'components/Navbar/Navbar';

import HomePage from 'pages/Home/HomePage';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';
import ProfileSettingPage from 'pages/UserProfile/SelfProfile/ProfileSettingPage';

import CommunityPage from 'pages/Community/CommunityPage';

import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <WalletProviders>
      <TokenRegistryProvider>
        <RecoilRoot>
          <BrowserRouter>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <AuthManager>
              <Navbar />
              <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/user/:userName" element={<UserProfilePage />} />
                <Route
                  path="/profile/settings"
                  element={<OnlyAuthRoute element={<ProfileSettingPage />} />}
                />
                <Route
                  path="/c/:cId"
                  element={
                    <OnlyAuthRoute
                      element={
                        <TokenRegistryProvider>
                          <CommunityPage />
                        </TokenRegistryProvider>
                      }
                    />
                  }
                />
              </Routes>
            </AuthManager>
          </BrowserRouter>
        </RecoilRoot>
      </TokenRegistryProvider>
    </WalletProviders>
  );
}

export default App;
