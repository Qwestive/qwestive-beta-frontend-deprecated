/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import qwestiveLogo from 'assets/qwestiveLogo.svg';

import SignoutWithWallet from '../../services/Firebase/Authentication/SignoutWithWallet';
import {
  userPublicKeyAtom,
  userNameAtom,
  userProfileImageAtom,
} from '../../services/recoil/userInfo';
import appConfig from '../../config.js';
import WalletButton from '../Solana/SolanaWallet/WalletButton';
import ClassNamesLogic from '../Util/ClassNamesLogic';
import PopulateDbButton from './PopulateDbButton';

// Main navigation bar for the app.
const Navbar = function Navbar(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userName = useRecoilValue(userNameAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);

  const userNavigation = [
    { name: 'Your Profile', href: `/user/${userName}` },
    { name: 'Settings', href: '/profile/settings' },
  ];
  const { disconnect, connected } = useWallet();

  async function disconnectAll() {
    try {
      await SignoutWithWallet({ disconnect, connected });
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(`Failed to signout: ${error?.message}`);
    }
  }

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14">
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
                  <Link to="/">
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
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                {appConfig.LANDING_PAGE_SIGN_IN_ENABLED && (
                  <div className="flex-shrink-0">
                    <WalletButton />
                  </div>
                )}
                {appConfig.DEV_MODE_ENABLED && (
                  <div className="flex-shrink-0">
                    <PopulateDbButton />
                  </div>
                )}
                {userPublicKey !== undefined && (
                  <div
                    className="hidden md:ml-4 md:flex-shrink-0 md:flex 
                  md:items-center">
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
                          <Menu.Item key="Sign out">
                            {({ active }) => (
                              <button
                                type="button"
                                className={ClassNamesLogic(
                                  active ? 'bg-gray-100' : '',
                                  ' block w-full px-4 py-2 text-sm' +
                                    ' text-gray-700 text-left'
                                )}
                                onClick={disconnectAll}>
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>

          {userPublicKey !== undefined && (
            <Disclosure.Panel className="md:hidden bg-white">
              {({ close }) => (
                <div className="pt-4 pb-3">
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
                    <div className="ml-3 overflow-hidden truncate">
                      <div
                        className="text-base font-medium text-primary
                     truncate">
                        {userName ?? userPublicKey}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1 sm:px-3">
                    {userNavigation.map((item) => (
                      <Link to={item.href} key={item.name} className="w-full">
                        <Disclosure.Button
                          className="block w-full text-left px-3 py-2 
                      rounded-md text-base font-medium text-color-primary 
                      hover:text-white hover:bg-gray-700">
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}

                    <button
                      type="button"
                      key="Sign out"
                      className="block w-full
                      rounded-md text-color-primary 
                      hover:text-white hover:bg-gray-700"
                      onClick={() => {
                        disconnectAll();
                        close();
                      }}>
                      <div
                        className="w-full text-left 
                      text-base font-medium px-3 py-2">
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
