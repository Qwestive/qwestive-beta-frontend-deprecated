import React from 'react';
import bannerImage from '../../assets/landingBannerImage.svg';
import telegramLogo from '../../assets/telegramLogo.svg';
import twitterLogo from '../../assets/twitterLogo.svg';
import discordLogo from '../../assets/discordLogo.svg';
import defaultUserProfileImage from '../../assets/defaultUserProfileImage.png';

function HomePage(): JSX.Element {
  const communities = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col w-11/12 md:w-10/12 mx-auto">
      <div className="flex flex-col items-center md:min-h-screen md:flex-row md:space-x-10 md:p-10">
        <div className="w-3/4 md:w-1/2 flex flex-col items-center">
          <h1 className="invisible md:visible md:text-7xl lg:text-8xl font-black text-white">
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
        <img
          className="w-3/4 md:w-1/2 mt-10 md:pt-0"
          src={bannerImage}
          alt=""
        />
      </div>
      <div className="w-full mt-20 md:mt-0">
        <div className="text-center text-color-secondary text-4xl">
          Who&apos;s using Qwestive?
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-10">
          {communities.map((item) => (
            <div id="{item}">
              <a
                className="flex flex-col align-items-center"
                href="https://www.solana.com"
                target="_blank"
                rel="noreferrer">
                <img src={defaultUserProfileImage} alt="" />
                <h3>Solana Foundation</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-r from-green-400 to-purple-500 pt-1 mt-10" />
      <div
        className="w-full flex flex-row justify-center space-x-8 mt-10 mb-20
        bg-gradient-to-r from-green-400 to-purple-500 text-transparent 
        bg-clip-text flex-wrap">
        <a href="https://www.docs.qwestive.io" target="_blank" rel="noreferrer">
          Docs
        </a>
        <a href="https://discord.gg/fU853QRU" target="_blank" rel="noreferrer">
          Discord
        </a>
        <a href="https://twitter.com/qwestive" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a
          href="https://github.com/Qwestive/qwestive-beta-frontend"
          target="_blank"
          rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.qwestive.io" target="_blank" rel="noreferrer">
          Riptide Hackathon
        </a>
      </div>
    </div>
  );
}

export default HomePage;
