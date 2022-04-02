import React, { useState } from 'react';

import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import CommunitiesTab from './CommunitiesTab';
import PostFeedTab from './PostFeedTab';

export default function HomePageInternal(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: 'Communities', idx: 0 },
    { name: 'Feed', idx: 1 },
  ];

  return (
    <div className="page-frame max-w-5xl">
      <div className="border-b border-gray-500">
        <nav className="flex justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              className={ClassNamesLogic(
                currentTab === tab.idx
                  ? 'border-qwestive-purple font-bold'
                  : 'border-transparent hover:border-gray-300' +
                      ' dark:hover:border-gray-700',
                'flex-1 text-color-0 whitespace-nowrap pt-4 pb-2 px-1' +
                  ' border-b-2 text-lg'
              )}
              aria-current={currentTab === tab.idx ? 'page' : undefined}
              onClick={() => setCurrentTab(tab.idx)}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className={currentTab !== 0 ? 'hidden' : ''}>
        <CommunitiesTab />
      </div>
      <div className={currentTab !== 1 ? 'hidden' : ''}>
        <PostFeedTab />
      </div>
    </div>
  );
}
