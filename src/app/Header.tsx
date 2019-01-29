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
          <Link to={routePaths.home} className="nav-link logo">
            {labels.header.appLabel}
          </Link>
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
                <i className="fa fa-th pr-1" />
                Participants
              </a>
              <div
                className="dropdown-menu z-dashlist animated flipInX"
                aria-labelledby="dropdown01"
              >
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="studies">
                          <i className="pe pe-7s-paint-bucket text-accent" />
                          <h5>Studies</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="sites.html">
                          <i className="pe pe-7s-map-marker text-accent" />
                          <h5>Sites</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="participants">
                          <i className="pe pe-7s-users text-accent" />
                          <h5>Participants</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="specimen">
                          <i className="pe pe-7s-eyedropper text-accent" />
                          <h5>Specimen</h5>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="analytics">
                          <i className="pe pe-7s-graph1 text-accent" />
                          <h5>Analytics</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="exports">
                          <i className="pe pe-7s-box1 text-accent" />
                          <h5>Exports</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="document_library">
                          <i className="pe pe-7s-folder text-accent" />
                          <h5>Document Library</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="modules">
                          <i className="pe pe-7s-more text-accent" />
                          <h5>More</h5>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
              <i className="fa fa-th-large pr-1" />
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/enroll">
              <i className="fa fa-users pr-1" />
              Enroll
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/track">
              <i className="fa fa-clock-o pr-1" />
              Track
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/participants">
              <i className="fa fa-list-alt pr-1" />
              eCRFs
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/safety">
              <i className="fa fa-thermometer pr-1" />
              Safety
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/query">
              <i className="fa fa-question-circle-o pr-1" />
              Query
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/reports">
              <i className="fa fa-newspaper-o pr-1" />
              Reports
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/documents">
              <i className="fa fa-files-o pr-1" />
              Documents
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/personalize">
              <i className="fa fa-sliders pr-1" />
              Personalize
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
                  <span className="badge badge-warning">WAR</span> There are
                  many variations.
                </li>
                <li className="list-group-item">
                  <span className="badge badge-danger">ERR</span> Contrary to
                  popular belief.
                </li>
                <li className="list-group-item summary">
                  <Link to="notifications">See all notifications</Link>
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
                        <Link to="projects">
                          <i className="pe pe-7s-portfolio text-accent" />
                          <h5>Projects</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="mailbox">
                          <i className="pe pe-7s-mail text-accent" />
                          <h5>Email</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="contacts">
                          <i className="pe pe-7s-users text-accent" />
                          <h5>Contacts</h5>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="forum">
                          <i className="pe pe-7s-comment text-accent" />
                          <h5>Forum</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="analytics">
                          <i className="pe pe-7s-graph1 text-accent" />
                          <h5>Analytics</h5>
                        </Link>
                      </td>
                      <td>
                        <Link to="file_manager">
                          <i className="pe pe-7s-box1 text-accent" />
                          <h5>Files</h5>
                        </Link>
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
                  You have 5 new messages.
                </li>
                <li className="list-group-item">It is a long established.</li>
                <li className="list-group-item">There are many variations.</li>
                <li className="list-group-item">
                  Lorem Ipsum is simply dummy.
                </li>
                <li className="list-group-item">Contrary to popular belief.</li>
                <li className="list-group-item summary">
                  <Link to="messages">See All Messages</Link>
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
