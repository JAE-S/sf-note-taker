// React Core Imports
import React from 'react';
// Assets Imports
import SurfeLogo from '../../assets/images/surfe-logo-dark.svg';

const Header: React.FC = () => {
  return (
    <header className="shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Surfe Logo */}
        <figure className="pointer-events-all mr-md-90 m-0 p-0" role="banner">
          <a
            className="site-header__logoLink d-block color-current td-none w-100"
            href="http://localhost:5173/"
            rel="home"
            title="SURFE"
          >
            <img src={SurfeLogo} alt="Surfe Logo" className="h-6 w-full" />
          </a>
        </figure>
      </div>
    </header>
  );
};

export default Header;
