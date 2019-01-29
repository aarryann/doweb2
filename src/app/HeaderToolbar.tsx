// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

interface IHeaderToolbarProps {
  handleSignOut(): void;
  showRSidebar(sb: any): void;
}

export default function HeaderToolbar(props: IHeaderToolbarProps) {
  return (
    <div className="navbar-right">
      <ul className="nav navbar-nav no-borders">
        <li className="dropdown">
          <a className="z-flat-button" href="#" data-toggle="dropdown">
            <i className="fa fa-bullhorn" />
          </a>
          <ul className="list-group dropdown-menu z-drop-list animated flipInX">
            <li className="list-group-item">
              <a>
                <span className="badge badge-success">NEW</span> It is a long
                established.
              </a>
            </li>
            <li className="list-group-item">
              <span className="badge badge-warning">WAR</span> There are many
              variations.
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
            <li className="list-group-item">Lorem Ipsum is simply dummy.</li>
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
  );
}
