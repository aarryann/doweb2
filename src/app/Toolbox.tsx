/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Toolbox(props: any) {
  return (
    <>
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
    </>
  );
}
