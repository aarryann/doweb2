// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';
import { routePaths } from '../config/paths';

import logo from '../assets/img/logo.png';
import './Header.scss';

interface IHeaderProps {
  handleSignOut(): void;
  showRSidebar(sb: any): void;
}

export default function Header(props: IHeaderProps) {
  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light header">
      <div className="logoContainer">
        <div className="logoCol">
          <Link to={routePaths.home} className="navbar-brand logo">
            <img src={logo} height="50px" />
          </Link>
        </div>
        <div className="lblCol">
          <span>{labels.header.appLabel}</span>
        </div>
        <div className="modCol">
          <ul className="navbar-nav">
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
          </ul>
        </div>
      </div>
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
        <ul className="navbar-nav ml-auto">
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/">
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Payroll
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Employee
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Benefits
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              HR
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Setup
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Workers' Comp
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Projects
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Reports
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/settings">
              Marketplace
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
            className="form-control mr-sm-2 search"
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
                          <i className="pe pe-7s-portfolio text-accent" />
                          <h5>Projects</h5>
                        </a>
                      </td>
                      <td>
                        <a href="mailbox.html">
                          <i className="pe pe-7s-mail text-accent" />
                          <h5>Email</h5>
                        </a>
                      </td>
                      <td>
                        <a href="contacts.html">
                          <i className="pe pe-7s-users text-accent" />
                          <h5>Contacts</h5>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="forum.html">
                          <i className="pe pe-7s-comment text-accent" />
                          <h5>Forum</h5>
                        </a>
                      </td>
                      <td>
                        <a href="analytics.html">
                          <i className="pe pe-7s-graph1 text-accent" />
                          <h5>Analytics</h5>
                        </a>
                      </td>
                      <td>
                        <a href="file_manager.html">
                          <i className="pe pe-7s-box1 text-accent" />
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
                href="javascript:;"
                id="sidebar"
                onClick={props.showRSidebar}
                className="z-flat-button right-sidebar-toggle"
              >
                <i className="fa fa-newspaper-o" />
              </a>
            </li>
            <li className="dropdown">
              <a
                href="signin"
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
