import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { logInStateAtom } from 'services/recoil/appState';
import { useNavigate, useLocation } from 'react-router-dom';
import WalletButton from 'components/Solana/SolanaWallet/WalletButton';
import Spinner from 'components/Util/Spinner';
import { userInfoAtom } from 'services/recoil/userInfo';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const logInState = useRecoilValue(logInStateAtom);
  const [logMessage, setLogMessage] = useState('');

  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    switch (logInState) {
      case 'receive':
        setLogMessage('Waiting for message');
        break;
      case 'sign':
        setLogMessage('Please sign the message');
        break;
      case 'verify':
        setLogMessage('Verifying the signature');
        break;
      case 'authed':
        setLogMessage('Scanning your wallet');
        break;
      default:
        setLogMessage('');
        break;
    }
  }, [logInState]);

  useEffect(() => {
    if (userInfo !== undefined) {
      /// Once logged in, redirect to user to the requested URL or the homepage
      /// if no particular URL was requested.
      const redirectPath =
        location.pathname === '/login' ? '/' : location.pathname;
      navigate(redirectPath);
    }
  }, [userInfo]);

  return (
    <div className="container-0 max-w-7xl mt-20">
      <main
        className="flex-grow flex flex-col 
      justify-center 
       w-full mx-auto">
        <h1
          className="mt-4 text-xl text-center font-extrabold 
          text-color-0 leading-tight">
          Sign in to your account <br /> or create a new one.
        </h1>
        <p
          className="mt-1 text-base 
        font-semibold text-center text-color-secondary max-w-md mx-auto">
          Welcome !
        </p>
        <div className="mx-auto mt-2">
          <div className=" mx-auto">
            <div className="text-center font-bold text-color-0 text-lg">
              Login with your wallet.
            </div>
            <div className=" flex justify-center mx-auto w-42 mt-2  ">
              <WalletButton />
            </div>
            <div
              className="mt-2 text-xs font-semibold text-center 
              text-color-secondary max-w-xs">
              We will ask you to sign an unique message with your wallet to
              verify that you own it.
            </div>
          </div>
          {logMessage !== '' && (
            <div className="mt-2 flex items-center text-color-0 mx-auto ">
              <p
                className="text-sm text-left mt-0.5 
              font-semibold mx-auto flex gap-2">
                <Spinner classExtend="h-5" />
                {logMessage}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
