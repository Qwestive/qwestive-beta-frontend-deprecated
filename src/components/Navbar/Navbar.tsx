import React from 'react';
import { Link } from 'react-router-dom';
import { userInfoAtom } from 'services/recoil/userInfo';
import { useRecoilValue } from 'recoil';
import qwestiveLogoBlack from 'assets/logoPng/Qwestive-black.png';
import qwestiveLogoWhite from 'assets/logoPng/Qwestive-white.png';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

// Main navigation bar for the app.
const Navbar = function Navbar(): JSX.Element {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <nav className="h-10 container-0 max-w-7xl">
      <div className="flex gap-1 items-center">
        <div className="sm:flex-1" />
        {/* Logo */}
        <div className="flex-none flex-shrink pb-1.5 pt-2.5">
          <Link to="/">
            {/* Logo dark mode */}
            <div className="block dark:hidden">
              <img
                className="block lg:hidden max-h-8 w-auto"
                src={qwestiveLogoBlack}
                alt="Qwestive"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src={qwestiveLogoBlack}
                alt="Qwestive"
              />
            </div>
            {/* Logo light mode */}
            <div className="hidden dark:block">
              <img
                className="block lg:hidden h-8 w-auto"
                src={qwestiveLogoWhite}
                alt="Qwestive"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src={qwestiveLogoWhite}
                alt="Qwestive"
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 flex justify-end gap-2 py-1">
          {userInfo === undefined && (
            <Link to="/login">
              <button
                type="button"
                className="h-8 px-5 whitespace-nowrap button-action shadow-sm">
                Log In
              </button>
            </Link>
          )}
          {/* Profile dropdown */}
          <div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
