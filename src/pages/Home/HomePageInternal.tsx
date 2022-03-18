import React, { useState } from 'react';

import ClassNamesLogic from '../../common/components/Util/ClassNamesLogic';
import CommunitiesTab from './components/CommunitiesTab';
import { TokenRegistryProvider } from '../../common/components/Solana/TokenRegistry';
import PostFeedTab from './components/PostFeedTab';
/*
ToDo:
Make two tabs
one tab is a feed
the secondary tab is
*/

export default function HomePageInternal(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: 'Communities', idx: 0 },
    { name: 'Feed', idx: 1 },
  ];
  return (
    <div className="max-w-2xl mx-auto mt-8 px-1 mb-5">
      <div className="border-b border-gray-500">
        <nav className="flex justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              className={ClassNamesLogic(
                currentTab === tab.idx
                  ? 'border-qwestive-purple text-color-primary font-bold'
                  : 'border-transparent text-color-primary font-medium' +
                      'hover:text-gray-700 hover:border-gray-300',
                'flex-1 whitespace-nowrap pt-4 pb-2 px-1 border-b-4 text-lg'
              )}
              aria-current={currentTab === tab.idx ? 'page' : undefined}
              onClick={() => setCurrentTab(tab.idx)}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className={currentTab !== 0 ? 'hidden' : ''}>
        <TokenRegistryProvider>
          <CommunitiesTab />
        </TokenRegistryProvider>
      </div>
      <div className={currentTab !== 1 ? 'hidden' : ''}>
        <PostFeedTab />
      </div>
    </div>
  );
}
