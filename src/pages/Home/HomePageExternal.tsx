import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import telegramLogo from '../../assets/telegramLogo.svg';
import twitterLogo from '../../assets/twitterLogo.svg';
import discordLogo from '../../assets/discordLogo.svg';
import discussionCardImage from '../../assets/discussionCardImage.svg';
import pollCardImage from '../../assets/pollCardImage.svg';
import bountyCardImage from '../../assets/bountyCardImage.svg';
import tipCardImage from '../../assets/tipCardImage.svg';
import CommunityCarousel from './components/CommunityCarousel';
import WalletButton from '../../components/Solana/SolanaWallet/WalletButton';
import FeatureCard from './components/FeatureCard';
import appConfig from '../../config.js';

function HomePageExternal(): JSX.Element {
  const [section2aFadeIn, setSection2aFadeIn] = useState(false);
  const [section2bFadeIn, setSection2bFadeIn] = useState(false);
  const [section2cFadeIn, setSection2cFadeIn] = useState(false);
  const [section3FadeIn, setSection3FadeIn] = useState(false);
  const [section4FadeIn, setSection4FadeIn] = useState(false);
  const [section5FadeIn, setSection5FadeIn] = useState(false);
  const [section6FadeIn, setSection6FadeIn] = useState(false);
  const [section7FadeIn, setSection7FadeIn] = useState(false);
  const [section8FadeIn, setSection8FadeIn] = useState(false);
  const [section9FadeIn, setSection9FadeIn] = useState(false);
  const [section2aRef, section2aRefInView] = useInView({ threshold: 0.1 });
  const [section2bRef, section2bRefInView] = useInView({ threshold: 0.6 });
  const [section2cRef, section2cRefInView] = useInView({ threshold: 1 });
  const [section3Ref, section3RefInView] = useInView({ threshold: 0.3 });
  const [section4Ref, section4RefInView] = useInView({ threshold: 0.3 });
  const [section5Ref, section5RefInView] = useInView({ threshold: 0.3 });
  const [section6Ref, section6RefInView] = useInView({ threshold: 0.3 });
  const [section7Ref, section7RefInView] = useInView({ threshold: 0.3 });
  const [section8Ref, section8RefInView] = useInView({ threshold: 0.3 });
  const [section9Ref, section9RefInView] = useInView();

  useEffect(() => {
    if (section2aRefInView) {
      setSection2aFadeIn(true);
    }
    if (section2bRefInView) {
      setSection2bFadeIn(true);
    }
    if (section2cRefInView) {
      setSection2cFadeIn(true);
    }
    if (section3RefInView) {
      setSection3FadeIn(true);
    }
    if (section4RefInView) {
      setSection4FadeIn(true);
    }
    if (section5RefInView) {
      setSection5FadeIn(true);
    }
    if (section6RefInView) {
      setSection6FadeIn(true);
    }
    if (section7RefInView) {
      setSection7FadeIn(true);
    }
    if (section8RefInView) {
      setSection8FadeIn(true);
    }
    if (section9RefInView) {
      setSection9FadeIn(true);
    }
  }, [
    section2aRefInView,
    section2bRefInView,
    section2cRefInView,
    section3RefInView,
    section4RefInView,
    section5RefInView,
    section6RefInView,
    section7RefInView,
    section8RefInView,
    section9RefInView,
  ]);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col items-center 
        min-h-screen w-10/12 mx-auto">
        <div className="flex flex-col items-center my-auto">
          <h1
            className="text-center text-6xl 
            lg:text-7xl font-black text-white">
            <span
              className="bg-gradient-to-r text-transparent 
            bg-clip-text from-green-400 to-purple-500">
              Token gated community spaces
            </span>
          </h1>
          <p className="text-color-primary text-2xl text-center mt-10 w-10/12">
            A space for token-communities to discuss, coordinate, and share
            value, through seamless off-chain and on-chain experiences.
          </p>
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
            <a
              href="https://msng.link/o/?qwestive=tg"
              target="_blank"
              rel="noreferrer">
              <img className="h-8" src={telegramLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div
        className="p-10 pt-0 text-center text-3xl font-extrabold flex 
        flex-col mx-auto w-10/12 md:flex-row">
        <div
          ref={section2aRef}
          className={`bg-gradient-to-r text-transparent bg-clip-text
          from-purple-500 to-blue-500 my-10 ${
            section2aFadeIn ? 'animate-fadeIn' : 'opacity-0'
          }`}>
          1. Connect your wallet
        </div>
        <div
          ref={section2bRef}
          className={`bg-gradient-to-r text-transparent bg-clip-text
            from-blue-500 to-gray-500 my-10 ${
              section2bFadeIn ? 'animate-fadeIn' : 'opacity-0'
            }`}>
          2. Access your token&apos;s community
        </div>
        <div
          ref={section2cRef}
          className={`text-color-secondary  my-10 ${
            section2cFadeIn ? 'animate-fadeIn' : 'opacity-0'
          }`}>
          3. Post, like, share value!
        </div>
      </div>
      {appConfig.LANDING_PAGE_SHOW_COMMUNITIES_SECTION && (
        <div
          ref={section3Ref}
          className={`w-full mt-20
          ${
            section3FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
          }`}>
          <h2
            className="text-center text-color-secondary text-4xl 
            tracking-tight leading-10 font-extrabold">
            Who&apos;s using Qwestive?
          </h2>
          <div className="mt-10">
            <CommunityCarousel />
          </div>
        </div>
      )}
      <div
        ref={section4Ref}
        className={`w-11/12 md:w-10/12 mx-auto px-6 pb-4 md:pb-0
        bg-landing-page-card-gray rounded-lg
        ${
          section4FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
        }`}>
        <FeatureCard
          title="Facilitated discussions"
          contents="Escape the endless notifications &amp; chaos from Discord. 
          Just see the important stuff that you need to know with forum style
          discussion threads."
          imgUrl={discussionCardImage}
        />
      </div>
      <div
        ref={section5Ref}
        className={`w-11/12 md:w-10/12 mx-auto px-6 pb-4 md:pb-0 mt-10
        bg-landing-page-card-gray rounded-lg
        ${
          section5FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
        }`}>
        <FeatureCard
          title="Token Gated Polls &amp; Votes"
          contents="Off-chain polls and on-chain votes which facillitate the 
          decision making process for the community and allow the participation
          of all stake holders, the token holders."
          imgUrl={pollCardImage}
        />
      </div>
      <div
        ref={section6Ref}
        className={`w-11/12 md:w-10/12 mx-auto px-6 pb-4 md:pb-0 mt-10
        bg-landing-page-card-gray rounded-lg
        ${
          section6FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
        }`}>
        <FeatureCard
          title="On-Chain Bounties and Contests"
          contents="On-chain bounties and contests empower the community by 
          allowing members to coordinate and reward important contributions."
          imgUrl={bountyCardImage}
        />
      </div>
      <div
        ref={section7Ref}
        className={`w-11/12 md:w-10/12 mx-auto px-6 pb-4 md:pb-0 mt-10
        bg-landing-page-card-gray rounded-lg
        ${
          section7FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
        }`}>
        <FeatureCard
          title="Giveaways, Tips, and more!"
          contents="Communities are empowered with simple, blockchain-enabled
          tools to exchange value among members!"
          imgUrl={tipCardImage}
        />
      </div>
      {appConfig.LANDING_PAGE_SIGN_IN_ENABLED && (
        <div
          ref={section8Ref}
          className={`w-full mt-40
          ${
            section8FadeIn ? 'animate-fadeInSlide' : 'opacity-0 translate-y-300'
          }`}>
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
      )}
      <div
        ref={section9Ref}
        className={
          section9FadeIn
            ? 'w-full mt-20 animate-fadeInSlide'
            : 'w-full mt-20 opacity-0 translate-y-300'
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
            href="mailto: contact@qwestive.io"
            target="_blank"
            rel="noreferrer">
            Email Us
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
        </div>
      </div>
    </div>
  );
}

export default HomePageExternal;
