import React from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function FeatureCarousel(): JSX.Element {
  const tabs = [
    { name: 'Content', href: '#', current: false },
    { name: 'Votes', href: '#', current: false },
    { name: 'Bounties', href: '#', current: true },
    { name: 'And More...', href: '#', current: false },
  ];

  return (
    <div>
      <div className="sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs[0].name}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? 'bg-gray-100 text-gray-700'
                  : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={tab.current ? 'page' : undefined}>
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default FeatureCarousel;
