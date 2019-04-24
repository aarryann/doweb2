/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Notifications(props: any) {
  return (
    <>
      <a className="z-flat-button" href="#" data-toggle="dropdown">
        <i className="fa fa-bullhorn" />
      </a>
      <ul className="list-group dropdown-menu z-drop-list animated flipInX">
        <li className="list-group-item unread">
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
          <span className="badge badge-danger">ERR</span> Contrary to popular
          belief.
        </li>
        <li className="list-group-item summary">
          <Link to="notifications">See all notifications</Link>
        </li>
      </ul>
    </>
  );
}
