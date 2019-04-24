/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function FeatureMenu(props: any) {
  return (
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
        <Link className="nav-link active" to="/subjects">
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
  );
}
