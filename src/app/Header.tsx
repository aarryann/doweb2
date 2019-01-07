import React from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';
import { routePaths } from '../config/paths';

import './Header.scss';

interface IHeaderProps {
  handleSignOut(): void;
}

export default function Header(props: IHeaderProps) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light header">
      <div className="container-fluid zeropad">
        <Link to={routePaths.home} className="navbar-brand logo">
          {labels.header.appLabel}
        </Link>
        <button
          className="navbar-toggler mobile-menu-toggle"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-collapse"
          aria-controls="mobile-menu"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-chevron-down" />
        </button>
        <div className="collapse navbar-collapse top-menu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </li>
          </ul>
          <form className="form-inline d-none d-md-flex">
            <label className="sr-only" htmlFor="search">
              {labels.header.searchLabel}
            </label>
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-search" aria-hidden="true" />
                </span>
              </div>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder={labels.header.searchPlaceholder}
                aria-label={labels.header.searchLabel}
                id="search"
              />
            </div>
          </form>
          <ul className="navbar-nav ml-none">
            <li className="nav-item">
              <a href="#" onClick={props.handleSignOut} className="nav-link">
                {labels.header.signOut}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
