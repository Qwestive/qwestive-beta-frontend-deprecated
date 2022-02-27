import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import bannerImage from '../../assets/landingBannerImage.svg';
import telegramLogo from '../../assets/telegramLogo.svg';
import twitterLogo from '../../assets/twitterLogo.svg';
import discordLogo from '../../assets/discordLogo.svg';
import CommunityCarousel from './components/CommunityCarousel';
import WalletButton from '../../common/components/Solana/SolanaWallet/WalletButton';
import FeatureCarousel from './components/FeatureCarousel';

function HomePageExternal(): JSX.Element {
  const [section2FadeIn, setSection2FadeIn] = useState(false);
  const [section3FadeIn, setSection3FadeIn] = useState(false);
  const [section4FadeIn, setSection4FadeIn] = useState(false);
  const [section2Ref, section2RefInView] = useInView();
  const [section3Ref, section3RefInView] = useInView();
  const [section4Ref, section4RefInView] = useInView();

  useEffect(() => {
    if (section2RefInView) {
      setSection2FadeIn(true);
    }
    if (section3RefInView) {
      setSection3FadeIn(true);
    }
    if (section4RefInView) {
      setSection4FadeIn(true);
    }
  }, [section2RefInView, section3RefInView, section4RefInView]);

  return (
    <div className="flex flex-col w-11/12 md:w-10/12 mx-auto">
      <div
        className="flex flex-col items-center 
        md:min-h-screen md:flex-row md:space-x-10 p-10">
        <div className="w-3/4 md:w-1/2 flex flex-col items-center">
          <h1
            className="text-center md:text-left text-6xl 
            lg:text-7xl font-black text-white">
            <span
              className="bg-gradient-to-r text-transparent 
            bg-clip-text from-green-400 to-purple-500">
              Token gated community spaces
            </span>
          </h1>
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
          className="w-3/4 md:w-1/2 mt-10 md:mt-0"
          src={bannerImage}
          alt=""
        />
      </div>
      <div
        ref={section2Ref}
        className={`w-full mt-20
        ${section2FadeIn ? 'animate-fadeIn' : 'opacity-0 translate-y-300'}`}>
        <h2
          className="text-center text-color-secondary text-4xl 
          tracking-tight leading-10 font-extrabold">
          Who&apos;s using Qwestive?
        </h2>
        <div className="mt-10">
          <CommunityCarousel />
        </div>
      </div>
      <div
        ref={section3Ref}
        className={`w-full mt-40 
        ${section3FadeIn ? 'animate-fadeIn' : 'opacity-0 translate-y-300'}`}>
        <h2
          className="text-center text-color-secondary text-4xl 
          tracking-tight leading-10 font-extrabold mb-10">
          Unlock the power of your community
        </h2>
        <FeatureCarousel />
      </div>
      <div
        ref={section4Ref}
        className={`w-full mt-40
        ${section4FadeIn ? 'animate-fadeIn' : 'opacity-0 translate-y-300'}`}>
        <div className="flex flex-col md:flex-row justify-center">
          <h3
            className="text-center md:text-left text-3xl font-black 
            text-white w-full md:w-1/2 mb-10 md:mb-0">
            <span
              className="bg-gradient-to-r text-transparent 
            bg-clip-text from-green-400 to-purple-500">
              Connect your wallet. <br /> Your communities are waiting.
            </span>
          </h3>
          <WalletButton />
        </div>
      </div>
      <div
        ref={section4Ref}
        className={
          section4FadeIn
            ? 'w-full mt-20 animate-fadeIn'
            : 'w-full mt-20 opacity-0 translate-y-500'
        }>
        <div
          className="w-full bg-gradient-to-r from-green-400 
          to-purple-500 pt-1 mt-10"
        />
        <div
          className="w-full flex flex-row justify-center space-x-8 mt-10 mb-20
          bg-gradient-to-r from-green-400 to-purple-500 text-transparent 
          bg-clip-text flex-wrap">
          <a
            href="https://www.docs.qwestive.io"
            target="_blank"
            rel="noreferrer">
            Docs
          </a>
          <a
            href="https://discord.gg/fU853QRU"
            target="_blank"
            rel="noreferrer">
            Discord
          </a>
          <a
            href="https://twitter.com/qwestive"
            target="_blank"
            rel="noreferrer">
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
    </div>
  );
}

export default HomePageExternal;
