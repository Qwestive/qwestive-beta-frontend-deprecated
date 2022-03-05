import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import ClassNamesLogic from '../../common/components/Util/ClassNamesLogic';

export default function NewPostTabs(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: 'Post' },
    { name: 'Poll' },
    { name: 'Bounty' },
    { name: 'Vote' },
  ];
  return (
    <div className="">
      <div className="text-xl mt-1 font-bold text-color-primary">New post</div>
      <div>
        {/* Small tabs dropdown */}
        <div className="mt-4 sm:hidden">
          <Listbox value={currentTab} onChange={setCurrentTab}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button
                  className="relative w-full 
                  border
                border-gray-200 
                bg-white
                text-color-primary
                rounded-md shadow-sm pl-3 pr-10 py-2 
                text-left 
                font-medium text-sm">
                  <span className="block truncate">
                    {tabs[currentTab].name}
                  </span>
                  <span
                    className="absolute 
                  inset-y-0 right-0 flex items-center 
                  pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="h-5 w-5 
                      "
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options
                    className="absolute z-40 
                    mt-1 w-full 
                    border-neutral-300 
                    bg-white
                    text-color-primary
                    dark:text-neutral-200
                    shadow-lg max-h-60 
                    rounded-md py-1 
                  focus:outline-none
                  font-medium text-sm
                  ">
                    {tabs.map((tab, idx) => (
                      <Listbox.Option
                        key={tab.name}
                        className={({ active }) =>
                          ClassNamesLogic(
                            active ? ' bg-gray-100 ' : '',
                            ' select-none relative py-2 pl-8 pr-4'
                          )
                        }
                        value={idx}>
                        {({ selected }) => (
                          <>
                            <span className="block truncate">{tab.name}</span>
                            {selected ? (
                              <span
                                className="absolute inset-y-0 
                              text-qwestive-purple
                              left-0 flex items-center 
                              pl-1.5">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
        {/* Large tabs */}
        <div className=" mt-4 hidden sm:block">
          <div className=" ">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  type="button"
                  className={ClassNamesLogic(
                    idx === currentTab
                      ? 'border-gray-900 text-color-primary'
                      : 'border-transparant ' +
                          ' text-color-secondary' +
                          ' hover:text-gray-700 hover:border-gray-400',
                    'w-full py-4 px-1 text-center border-b-2 ' +
                      'font-bold text-base'
                  )}
                  onClick={() => setCurrentTab(idx)}>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-5">
          <div
            className={ClassNamesLogic(
              currentTab === 0 ? 'block' : 'hidden',
              ''
            )}>
            <p>Tab 0</p>
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 1 ? 'block' : 'hidden',
              ''
            )}>
            <p>Tab 1</p>
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 2 ? 'block' : 'hidden',
              ''
            )}>
            <p>Tab 2</p>
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 3 ? 'block' : 'hidden',
              ''
            )}>
            <p>Tab 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
