import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { defaultUserProfileImage } from 'assets/userImages';
import SignoutWithWallet from 'services/Firebase/Authentication/SignoutWithWallet';

import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/outline';

import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { userInfoAtom } from 'services/recoil/userInfo';

import DarkModeSwitch from './DarkModeSwitch';

import 'style/Components/headers.css';

export default function ProfileDropdown(): JSX.Element {
  const { disconnect, connected } = useWallet();

  const userInfo = useRecoilValue(userInfoAtom);

  const userNavigation = [
    {
      name: 'My Profile',
      href: `/user/${userInfo?.userName}`,
      icon: <UserIcon className="flex-initial nav-icons-size" />,
    },
  ];

  async function SignoutFunction() {
    try {
      await SignoutWithWallet({ disconnect, connected });
    } catch (error: any) {
      toast.error(`Failed to signout: ${error?.message}`);
    }
  }

  return (
    <Menu as="div" className="text-md relative flex-shrink-0 z-30">
      {({ open }) => (
        <>
          <Menu.Button
            className="
                      rounded-3xl
                      flex
                      h-8
                      px-1
                      shadow-sm
                      dropdown-bg
                      border
                      border-gray-400
                      dark:border-gray-600
                      focus:outline-none 
                      hover:ring-2
                      hover:ring-inset
                      hover:ring-indigo-500
                      hover:ring-opacity-30
                      focus:ring-2
                      focus:ring-inset  
                      focus:ring-indigo-500
                      focus:ring-opacity-100
                      text-gray-500 
                      hover:text-gray-800
                      dark:text-gray-400 
                      dark:hover:text-gray-200">
            <span className="sr-only">Open user menu</span>
            <div className="flex my-auto items-center gap-1 ">
              {(userInfo === undefined ||
                userInfo?.profileImage === undefined) && (
                <UserCircleIcon className="ml-1 h-6 w-6" />
              )}
              {userInfo !== undefined &&
                (userInfo.profileImage !== '' ? (
                  <img
                    className="h-6 w-6 ml-1 rounded-full"
                    src={userInfo.profileImage}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-6 w-6 ml-1 rounded-full"
                    src={defaultUserProfileImage}
                    alt=""
                  />
                ))}
              {userInfo === undefined ? (
                <div
                  className={ClassNamesLogic(
                    open ? 'transform rotate-180' : '',
                    'transition-transform duration-300 ease-in-out' +
                      ' my-auto flex items-center h-4 w-4'
                  )}>
                  <ChevronDownIcon />
                </div>
              ) : (
                <div className="w-24 truncate font-semibold text-xs">
                  {userInfo?.userName}
                </div>
              )}
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              className="origin-top-right absolute 
                      right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                      dropdown-bg ring-1 ring-gray-200
                      dark:ring-gray-700 focus:outline-none
                      ">
              {userInfo !== undefined && (
                <div>
                  <Menu.Item disabled key="displayName">
                    <div
                      className=" 
                      block py-1 px-3 
                      w-full truncate -mb-1">
                      <p className="dropdown-text text-center truncate">
                        {userInfo.displayName}
                      </p>
                      <p
                        className="text-center mt-0.5 truncate
                      text-color-secondary text-xs font-medium">
                        {userInfo.publicKey}
                      </p>
                    </div>
                  </Menu.Item>
                  {userNavigation.map((item) => (
                    <Link to={item.href} key={item.name}>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={ClassNamesLogic(
                              active ? 'dropdown-bg-active' : '',
                              'block py-2 px-3 dropdown-text mt-1'
                            )}>
                            <div className="flex-1 flex items-center ">
                              {item.icon}
                              <p className="pl-2 ">{item.name}</p>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    </Link>
                  ))}
                </div>
              )}
              <Menu.Item disabled key="Dark mode">
                <div>
                  <DarkModeSwitch />
                </div>
              </Menu.Item>

              <div className="px-3 my-1">
                <div className="border-t border-gray-500" />
              </div>
              {/* Logout/ Signin */}
              {userInfo === undefined ? (
                /* Login */
                <Link to="/login" key="LoginSignin">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={ClassNamesLogic(
                          active ? 'dropdown-bg-active' : '',
                          ' block py-2 px-3 dropdown-text'
                        )}>
                        <div className="flex-1 flex items-center ">
                          <LoginIcon
                            className="flex-initial transform 
                              rotate-180 nav-icons-size"
                          />
                          <p className="pl-2">Signin/Login</p>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                </Link>
              ) : (
                /* Signout */
                <Menu.Item
                  onClick={() => {
                    SignoutFunction();
                  }}>
                  {({ active }) => (
                    <div
                      className={ClassNamesLogic(
                        active && 'dropdown-bg-active',
                        ' block py-2 px-3 dropdown-text cursor-pointer'
                      )}>
                      <div className="flex-1 flex items-center">
                        <LogoutIcon
                          className="flex-initial transform 
                              rotate-180 nav-icons-size"
                        />
                        <p className="pl-2">Signout</p>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
