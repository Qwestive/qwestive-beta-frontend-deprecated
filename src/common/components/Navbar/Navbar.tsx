/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import qwestiveLogo from '../../../assets/qwestiveLogo.svg';
import {
  userPublicKeyAtom,
  userNameAtom,
  userProfileImageAtom,
} from '../../../recoil/userInfo';
import defaultUserProfileImage from '../../../assets/defaultUserProfileImage.png';
import WalletButton from '../Solana/SolanaWallet/WalletButton';

import ClassNamesLogic from '../Util/ClassNamesLogic';

// TODO(diegoolalde): this is a template for a navbar. It requires multiple
// changes:
// - Add support for wallet connection.
// - Fetch user information once wallet is connected.
// - Add workings.
// - Add tests.
// - Add state management through atoms.
const Navbar = function Navbar(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userName = useRecoilValue(userNameAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Discover', href: '#', current: false },
    { name: 'My Communities', href: '#', current: false },
  ];
  const userNavigation = [
    { name: 'Your Profile', href: `user/${userName}` },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {userPublicKey !== undefined && (
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="inline-flex items-center justify-center p-2 
                    rounded-md text-gray-400 hover:text-white hover:bg-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-inset 
                    focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                )}
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={qwestiveLogo}
                    alt="Qwestive"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={qwestiveLogo}
                    alt="Qwestive"
                  />
                </div>
                {userPublicKey !== undefined && (
                  <div
                    className="hidden md:ml-6 md:flex md:items-center 
                  md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={ClassNamesLogic(
                          !item.current && 'text-gray-400 hover:text-gray-600',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <WalletButton />
                </div>
                {userPublicKey !== undefined && (
                  <div
                    className="hidden md:ml-4 md:flex-shrink-0 md:flex 
                  md:items-center">
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-400 
                      hover:text-gray-600 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-offset-gray-800 
                      focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button
                          className="bg-gray-800 flex text-sm rounded-full 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              userProfileImage && userProfileImage !== ''
                                ? userProfileImage
                                : defaultUserProfileImage
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          className="origin-top-right absolute 
                        right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                        bg-white ring-1 ring-black ring-opacity-5 
                        focus:outline-none z-50">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={ClassNamesLogic(
                                    active ? 'bg-gray-100' : '',
                                    ' block px-4 py-2 text-sm text-gray-700'
                                  )}>
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>

          {userPublicKey !== undefined && (
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    // bad practice To change
                    className={ClassNamesLogic(
                      item.current
                        ? 'bg-gray-900 text-white block w-full '
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'text-left px-3 py-2 rounded-md text-base font-medium' +
                        ' block w-full'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    <Link to={item.href}>{item.name}</Link>
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        userProfileImage && userProfileImage !== ''
                          ? userProfileImage
                          : defaultUserProfileImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {userName ?? userPublicKey}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-gray-800 p-1 
                    rounded-full text-gray-400 hover:text-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1 sm:px-3">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className="block w-full text-left px-3 py-2 
                      rounded-md text-base font-medium text-gray-400 
                      hover:text-white hover:bg-gray-700">
                      <Link to={item.href}>{item.name}</Link>
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
