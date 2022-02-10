import React from 'react';

function HomePage(): JSX.Element {
  return (
    <div className="p-10 min-h-screen flex items-center justify-center">
      <h1 className="text-9xl font-black text-white text-center">
        <span
          className="bg-gradient-to-r text-transparent 
        bg-clip-text from-green-400 to-purple-500">
          Welcome to Qwestive
        </span>
      </h1>
    </div>
  );
}

export default HomePage;
