import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import OwnedTokenGrid from './OwnedTokenGrid';

const tokenOwnedList = [
  {
    name: '$PRINTS',
    memberCount: 0,
    amountHeld: 5000,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: '$PRINTS',
    memberCount: 458,
    amountHeld: 5000,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: '$PRINTS',
    memberCount: 458,
    amountHeld: 5000,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];
export default function ClubsTab(): JSX.Element {
  return (
    <div>
      {/* Search Bar  */}
      <div className="flex-1 flex items-center justify-center mt-6">
        <div className=" w-full ">
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex 
            items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="text-lg block w-full pl-10 pr-3 py-3 border 
              border-gray-300 rounded-md leading-5 bg-white 
              placeholder-gray-500 focus:outline-none 
              focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 
              focus:border-gray-500 "
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
      {/* Token Grid  */}
      <OwnedTokenGrid tokenOwnedList={tokenOwnedList} />
    </div>
  );
}
