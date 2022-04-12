import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import WalletProviders from 'components/Solana/SolanaWallet/WalletProviders';
import AuthManager from 'components/Authentication/AuthManager';
import { TokenRegistryProvider } from 'components/Solana/TokenRegistry';

import AppContent from 'components/AppContent/AppContent';

import useDarkMode from 'components/Util/useDarkMode';

import 'style/global.css';
import 'style/Components/toastify.css';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  useDarkMode();
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
              <AppContent />
            </AuthManager>
          </BrowserRouter>
        </RecoilRoot>
      </TokenRegistryProvider>
    </WalletProviders>
  );
}

export default App;
