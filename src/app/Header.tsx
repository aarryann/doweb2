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
    <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light header">
      <Link to={routePaths.home} className="navbar-brand logo">
        {labels.header.appLabel}
      </Link>
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown menu-item">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Cases
            </a>
            <div
              className="dropdown-menu sub-menu-item"
              aria-labelledby="dropdown01"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/help">
              Help
            </Link>
          </li>
        </ul>
        <form
          className="form-inline d-none d-md-flex search-form"
          method="post"
          action="#"
        >
          <label className="sr-only" htmlFor="search">
            {labels.header.searchLabel}
          </label>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder={labels.header.searchPlaceholder}
            aria-label={labels.header.searchLabel}
            id="search"
          />
        </form>
        <div className="navbar-right">
          <ul className="nav navbar-nav no-borders">
            <li className="dropdown">
              <a className="z-flat-button" href="#" data-toggle="dropdown">
                <i className="fa fa-bullhorn" />
              </a>
              <ul className="list-group dropdown-menu z-drop-list animated flipInX">
                <li className="list-group-item">
                  <a>
                    <span className="badge badge-success">NEW</span> It is a
                    long established.
                  </a>
                </li>
                <li className="list-group-item">
                  <a>
                    <span className="badge badge-warning">WAR</span> There are
                    many variations.
                  </a>
                </li>
                <li className="list-group-item">
                  <a>
                    <span className="badge badge-danger">ERR</span> Contrary to
                    popular belief.
                  </a>
                </li>
                <li className="list-group-item summary">
                  <a href="#">See all notifications</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="z-flat-button" href="#" data-toggle="dropdown">
                <i className="fa fa-th" />
              </a>

              <div className="dropdown-menu z-dashlist animated flipInX">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <a href="projects.html">
                          <i className="fa fa-briefcase text-accent" />
                          <h5>Projects</h5>
                        </a>
                      </td>
                      <td>
                        <a href="mailbox.html">
                          <i className="fa fa-envelope-o text-accent" />
                          <h5>Email</h5>
                        </a>
                      </td>
                      <td>
                        <a href="contacts.html">
                          <i className="fa fa-address-book-o text-accent" />
                          <h5>Contacts</h5>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="forum.html">
                          <i className="fa fa-comments-o text-accent" />
                          <h5>Forum</h5>
                        </a>
                      </td>
                      <td>
                        <a href="analytics.html">
                          <i className="fa fa-line-chart text-accent" />
                          <h5>Analytics</h5>
                        </a>
                      </td>
                      <td>
                        <a href="file_manager.html">
                          <i className="fa fa-files-o text-accent" />
                          <h5>Files</h5>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li className="dropdown">
              <a
                className="z-flat-button badge-superscript"
                href="#"
                data-toggle="dropdown"
              >
                <i className="fa fa-envelope" />
                <span className="badge badge-accent">4</span>
              </a>
              <ul className="dropdown-menu list-group z-drop-list animated flipInX">
                <li className="list-group-item summary">
                  <a>You have 5 new messages.</a>
                </li>
                <li className="list-group-item">
                  <a>It is a long established.</a>
                </li>
                <li className="list-group-item">
                  <a>There are many variations.</a>
                </li>
                <li className="list-group-item">
                  <a>Lorem Ipsum is simply dummy.</a>
                </li>
                <li className="list-group-item">
                  <a>Contrary to popular belief.</a>
                </li>
                <li className="list-group-item summary">
                  <a href="#">See All Messages</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                id="sidebar"
                className="z-flat-button right-sidebar-toggle"
              >
                <i className="fa fa-newspaper-o" />
              </a>
            </li>
            <li className="dropdown">
              <a
                href="#"
                onClick={props.handleSignOut}
                className="z-flat-button"
              >
                <i className="fa fa-sign-out" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
