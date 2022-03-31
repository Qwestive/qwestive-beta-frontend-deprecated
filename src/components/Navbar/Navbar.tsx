import React from 'react';
import { Link } from 'react-router-dom';
import qwestiveLogoBlack from 'assets/logoPng/Qwestive-black.png';
import qwestiveLogoWhite from 'assets/logoPng/Qwestive-white.png';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

// Main navigation bar for the app.
const Navbar = function Navbar(): JSX.Element {
  return (
    <nav className="h-10 container-0">
      <div className="flex items-center">
        {/* Logo */}
        <div className="sm:flex-1" />
        <div className="flex-none pb-1.5 pt-2.5">
          <Link to="/">
            {/* Logo dark mode */}
            <div className="block dark:hidden">
              <img
                className="block lg:hidden h-8 w-auto"
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
                className="block lg:hidden h-7 w-auto"
                src={qwestiveLogoWhite}
                alt="Qwestive"
              />
              <img
                className="hidden lg:block h-7 w-auto"
                src={qwestiveLogoWhite}
                alt="Qwestive"
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 flex justify-end gap-2 py-1">
          <Link className="" to="/login">
            <button type="button" className="py-0.5 px-4 button-action ">
              Log In
            </button>
          </Link>
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
