import React, { useState } from 'react';

import ClassNamesLogic from '../../common/components/Util/ClassNamesLogic';
import ClubsTab from './components/ClubsTab';
import { TokenRegistryProvider } from '../../common/components/Solana/TokenRegistry';
/*
ToDo:
Make two tabs
one tab is a feed
the secondary tab is
*/

export default function HomePageInternal(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: 'Clubs', idx: 0 },
    { name: 'Feed', idx: 1 },
  ];
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="border-b-2 border-gray-900">
        <nav className="flex justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              className={ClassNamesLogic(
                currentTab === tab.idx
                  ? 'border-gray-900 text-color-primary font-bold'
                  : 'border-transparent text-color-primary font-medium' +
                      'hover:text-gray-700 hover:border-gray-300',
                'flex-1 whitespace-nowrap py-4 px-1 border-b-4 text-lg'
              )}
              aria-current={currentTab === tab.idx ? 'page' : undefined}
              onClick={() => setCurrentTab(tab.idx)}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className={ClassNamesLogic(currentTab !== 0 && 'hidden', '')}>
        <TokenRegistryProvider>
          <ClubsTab />
        </TokenRegistryProvider>
      </div>
    </div>
  );
}
