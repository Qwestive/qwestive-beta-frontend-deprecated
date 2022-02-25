import React, { useState } from 'react';
import featureImage from '../../../assets/featureImage.svg';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

class Tab {
  name: string;

  idx: number;

  header: string;

  description: string;

  imageUrl: string;

  constructor(
    name: string,
    idx: number,
    header: string,
    description: string,
    imageUrl: string
  ) {
    this.name = name;
    this.idx = idx;
    this.header = header;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

function FeatureCarousel(): JSX.Element {
  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const tabs = [
    new Tab(
      'Conversations',
      0,
      'Exclusive Conversations',
      'Create spam-less conversations where access is gated by a token ownership minimum!',
      featureImage
    ),
    new Tab(
      'Polls',
      1,
      'Exclusive Polls',
      'Get a clear signal from your community with polls where only those who own the token minimum you set can participate.',
      featureImage
    ),
    new Tab(
      'Votes',
      2,
      'On-Chain Votes',
      'Easily generate 1-click on-chain votes for token holders.',
      featureImage
    ),
    new Tab(
      'Bounties',
      3,
      'On-Chain Bounties and Contests',
      'Reward valuable community contributions with on-chain bounties where only token holders can participate.',
      featureImage
    ),
    new Tab(
      'More...',
      4,
      'Airdrops, Tips, and more!',
      'Any and all crypto-native interactions to empower token communities',
      featureImage
    ),
  ];

  const handleTabSelect = (tabName: string) => {
    setCurrentTabIdx(tabs.find((elem) => elem.name === tabName)?.idx ?? 0);
  };

  return (
    <div>
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500
           border-gray-300 rounded-md"
          defaultValue={tabs[currentTabIdx].name}
          onChange={(e) => handleTabSelect(e.target.value)}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block w-full">
        <nav className="flex space-x-6 justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              className={classNames(
                currentTabIdx === tab.idx
                  ? 'bg-gray-100 text-gray-700'
                  : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              onClick={() => {
                handleTabSelect(tab.name);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleTabSelect(tab.name);
              }}
              aria-current={currentTabIdx === tab.idx}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="container mx-auto mt-10 w-3/4">
        <div className="flex flex-col md:flex-row">
          <div
            className="w-full text-center md:w-1/2 text-color-secondary mt-4
             md:mt-10">
            <h3
              className="text-2xl tracking-tight leading-10 font-extrabold
               mb-10">
              {tabs[currentTabIdx].header}
            </h3>
            <div>{tabs[currentTabIdx].description}</div>
          </div>
          <img
            className="w-full md:w-1/2 mt-10 md:mt-0"
            src={tabs[currentTabIdx].imageUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
