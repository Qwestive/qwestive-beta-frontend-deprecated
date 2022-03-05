import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import WalletProviders from './common/components/Solana/SolanaWallet/WalletProviders';
import AuthManager from './common/components/Authentication/AuthManager';
import OnlyAuthRoute from './common/components/Authentication/OnlyAuthRoute';
import Navbar from './common/components/Navbar/Navbar';

import HomePage from './pages/Home/HomePage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import ProfileSettingPage from './pages/UserProfile/SelfProfile/ProfileSettingPage';

import CommunityPage from './pages/Community/CommunityPages/CommunityPage';
import PostDetailPage from './pages/Community/PostDetail/PostDetailPage';

import 'react-toastify/dist/ReactToastify.css';
import { TokenRegistryProvider } from './common/components/Solana/TokenRegistry';

function App(): JSX.Element {
  return (
    <WalletProviders>
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
              <Route path="/post/:postId" element={<PostDetailPage />} />
            </Routes>
          </AuthManager>
        </BrowserRouter>
      </RecoilRoot>
    </WalletProviders>
  );
}

export default App;
