import React from 'react';
import logo from './logo.svg';
import './App.css';

import ContextProvider from './SolanaWallet/ContextProvider';
import ConnectionButton from './SolanaWallet/ConnectionButton';

function App(): JSX.Element {
  return (
    <ContextProvider>
      <div className="App">
        <header className="App-header">
          <ConnectionButton />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </ContextProvider>
  );
}

export default App;
