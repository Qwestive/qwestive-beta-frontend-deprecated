import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { Icategory, IcommunityTokenInfo } from 'types/types';

import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';

type TcategoriesSmall = {
  communityTokenInfo: IcommunityTokenInfo | undefined;
  categoryList: Array<Icategory> | undefined;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};
export default function CategoriesSmall({
  communityTokenInfo,
  categoryList,
  setCurrentCategory,
  currentCategory,
}: TcategoriesSmall): JSX.Element {
  const [, setSearchParams] = useSearchParams({});

  return (
    <div
      className="w-full px-3
    flex justify-between items-center">
      {/* Token Infos */}
      <div>
        <div className="flex items-center py-2 gap-2 justify-left">
          <img
            src={communityTokenInfo?.logoUrl ?? defaultUserProfileImage}
            className="h-12"
            alt="tokenImage"
          />
          <p className="text-color-primary text-xl font-extrabold truncate">
            {communityTokenInfo?.name ?? 'Unknown'}
          </p>
        </div>
      </div>
      {/* Community Categories */}
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex justify-center w-full 
            rounded-md px-4 py-2 text-sm 
            font-medium text-gray-700 ">
              <ChevronDownIcon
                className="mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
              {currentCategory}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md 
            shadow-lg bg-white ring-1 
            ring-black ring-opacity-5
             focus:outline-none
             max-h-60 overflow-auto hideScrollBar
             ">
              <div className="py-1">
                <Menu.Item>
                  <button
                    type="button"
                    className={ClassNamesLogic(
                      currentCategory === 'All Topics'
                        ? 'bg-gray-200'
                        : 'hover:bg-gray-100',
                      'py-1 w-full'
                    )}
                    onClick={() => {
                      setCurrentCategory('All Topics');
                      setSearchParams('');
                    }}>
                    <div className="flex">
                      <p
                        className="px-4 w-52 truncate 
                    overflow-hidden  text-left  ">
                        All Topics
                      </p>
                    </div>
                  </button>
                </Menu.Item>
                {categoryList !== undefined &&
                  categoryList.map((category) => (
                    <Menu.Item key={category.name}>
                      <button
                        type="button"
                        className={ClassNamesLogic(
                          currentCategory === category.name
                            ? 'bg-gray-200'
                            : 'hover:bg-gray-100',
                          'py-1 w-full'
                        )}
                        onClick={() => {
                          setCurrentCategory(category.name);
                          setSearchParams('');
                        }}>
                        <div className="flex">
                          <p
                            className="px-4 w-52 truncate overflow-hidden 
                             text-left">
                            {category.name}
                          </p>
                          <p className="pr-3"> {category.count}</p>
                        </div>
                      </button>
                    </Menu.Item>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
