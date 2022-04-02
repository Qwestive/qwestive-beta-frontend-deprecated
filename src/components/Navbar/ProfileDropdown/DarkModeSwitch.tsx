import React, { useState } from 'react';
import { MoonIcon } from '@heroicons/react/outline';
import { Switch } from '@headlessui/react';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import useDarkMode from 'components/Util/useDarkMode';

import 'style/Components/headers.css';

export default function DarkModeSwitch(): JSX.Element {
  const [colorTheme, setTheme] = useDarkMode();
  const [enabled, setEnabled] = useState(colorTheme === 'light');

  return (
    <div
      className=" flex 
       py-2 px-3 
      items-center
      hover:bg-gray-200 
      dark:hover:bg-gray-700 
      dropdown-text">
      <div className="flex-1 flex items-center ">
        <MoonIcon className="flex-initial nav-icons-size" />
        <p className="flex-auto pl-2">Dark Mode</p>
      </div>
      <Switch
        checked={enabled}
        onChange={() => {
          setTheme(colorTheme);
          setEnabled(colorTheme === 'dark');
        }}
        className={ClassNamesLogic(
          enabled ? 'bg-indigo-500' : 'bg-gray-200',
          ' relative inline-flex flex-shrink-0' +
            ' h-5 w-9 border-2 border-transparent rounded-full' +
            ' cursor-pointer transition-colors ease-in-out duration-200' +
            ' focus:outline-none focus:ring-2' +
            ' focus:ring-indigo-500 hover:ring-2 hover:ring-indigo-500' +
            ' hover:ring-opacity-30 focus:ring-opacity-100'
        )}>
        <span className="sr-only">Use setting</span>
        <span
          className={ClassNamesLogic(
            enabled ? 'translate-x-4' : 'translate-x-0',
            'pointer-events-none relative inline-block' +
              ' h-4 w-4 rounded-full bg-white shadow' +
              ' transform ring-0 transition ease-in-out duration-200'
          )}>
          <span
            className={ClassNamesLogic(
              enabled
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full' +
                ' flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true">
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12">
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={ClassNamesLogic(
              enabled
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              ' absolute inset-0 h-full w-full' +
                ' flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true">
            <svg
              className="h-3 w-3 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 12 12">
              <path
                d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 
              8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 
              00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 
              1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
              />
            </svg>
          </span>
        </span>
      </Switch>
    </div>
  );
}
