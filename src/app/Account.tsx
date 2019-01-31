// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

interface IAccountProps {
  handleSignOut(): void;
}

export default function Account(props: IAccountProps) {
  return (
    <>
      <a
        className="z-flat-button badge-superscript"
        href="#"
        data-toggle="dropdown"
      >
        <i className="fa fa-user-circle" />
      </a>
      <ul className="dropdown-menu list-group z-drop-list animated flipInX">
        <li className="list-group-item text-center">
          <i className="fa fa-user-circle pr-1" />
          John Be
        </li>
        <li className="list-group-item text-center">My Profile</li>
        <li className="list-group-item text-center">Account Settings</li>
        <li className="list-group-item text-center">
          <Link to="signin" onClick={props.handleSignOut}>
            Sign Out
          </Link>
        </li>
      </ul>
    </>
  );
}
