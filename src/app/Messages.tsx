// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Messages(props: any) {
  return (
    <>
      <a
        className="z-flat-button badge-superscript"
        href="#"
        data-toggle="dropdown"
      >
        <i className="fa fa-envelope" />
        <span className="badge badge-accent">4</span>
      </a>
      <ul className="dropdown-menu list-group z-drop-list animated flipInX">
        <li className="list-group-item summary">You have 5 new messages.</li>
        <li className="list-group-item unread">It is a long established.</li>
        <li className="list-group-item unread">There are many variations.</li>
        <li className="list-group-item">Lorem Ipsum is simply dummy.</li>
        <li className="list-group-item">Contrary to popular belief.</li>
        <li className="list-group-item summary">
          <Link to="messages">See All Messages</Link>
        </li>
      </ul>
    </>
  );
}
