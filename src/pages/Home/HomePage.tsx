import React from 'react';
import bannerImage from '../../assets/landingBannerImage.svg';
import telegramLogo from '../../assets/telegramLogo.svg';
import twitterLogo from '../../assets/twitterLogo.svg';
import discordLogo from '../../assets/discordLogo.svg';

function HomePage(): JSX.Element {
  return (
    <div className="flex flex-col items-center min-h-screen md:flex-row md:space-x-10 md:p-10">
      <div className="w-3/4 md:w-1/2 flex flex-col items-center">
        <h1 className="invisible md:visible md:text-7xl lg:text-9xl font-black text-white">
          <span
            className="bg-gradient-to-r text-transparent 
          bg-clip-text from-green-400 to-purple-500">
            Qwestive
          </span>
        </h1>
        <h3 className="text-center text-color-secondary text-3xl md:text-xl">
          Token gated community spaces
        </h3>
        <div className="flex space-x-3 mt-8">
          <a
            href="https://discord.gg/fU853QRU"
            target="_blank"
            rel="noreferrer">
            <img className="h-8" src={discordLogo} alt="" />
          </a>
          <a
            href="https://twitter.com/qwestive"
            target="_blank"
            rel="noreferrer">
            <img className="h-8" src={twitterLogo} alt="" />
          </a>
          <a href="https://www.qwestive.io" target="_blank" rel="noreferrer">
            <img className="h-8" src={telegramLogo} alt="" />
          </a>
        </div>
      </div>
      <img className="w-3/4 md:w-1/2 pt-10 md:pt-0" src={bannerImage} alt="" />
    </div>
  );
}

export default HomePage;
