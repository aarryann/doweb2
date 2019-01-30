// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';

import './Header.scss';

import FeatureMenu from './FeatureMenu';
import Logo from './Logo';
import Messages from './Messages';
import Notifications from './Notifications';
import Search from './Search';
import Toolbox from './Toolbox';

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
        <div className="navbar-right">
          <ul className="nav navbar-nav no-borders">
            <li className="dropdown">
              <Notifications />
            </li>
            <li className="dropdown">
              <Toolbox />
            </li>
            <li className="dropdown">
              <Messages />
            </li>
            <li>
              <a
                href="javascript:;"
                id="sidebar"
                onClick={props.showRSidebar}
                className="z-flat-button right-sidebar-toggle"
              >
                <i className="fa fa-newspaper-o" />
              </a>
            </li>
            <li className="dropdown">
              <Link
                to="signin"
                onClick={props.handleSignOut}
                className="z-flat-button"
              >
                <i className="fa fa-sign-out" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
