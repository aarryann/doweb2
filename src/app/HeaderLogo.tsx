// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';
import { routePaths } from '../config/paths';

import logo from '../assets/img/logo.png';
import './HeaderLogo.scss';

export default function HeaderLogo(props: any) {
  return (
    <div className="logoContainer">
      <div className="logoCol">
        <Link to={routePaths.home} className="navbar-brand p-0">
          <img src={logo} height="55px" />
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
  );
}
