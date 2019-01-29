// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';

import './Header.scss';
import FeatureMenu from './HeaderFeatureMenu';
import Logo from './HeaderLogo';
import Search from './HeaderSearch';
import Toolbar from './HeaderToolbar';

interface IHeaderProps {
  handleSignOut(): void;
  showRSidebar(sb: any): void;
}

export default function Header(props: IHeaderProps) {
  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light header">
      <Logo />
      <button
        className="navbar-toggler mobile-menu-toggle"
        type="button"
        data-toggle="collapse"
        data-target="#mobile-menu"
        aria-controls="mobile-menu"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-chevron-down" />
      </button>
      <div className="collapse navbar-collapse top-menu" id="mobile-menu">
        <FeatureMenu />
        <Search />
        <Toolbar {...props} />
      </div>
    </nav>
  );
}
