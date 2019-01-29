// tslint:disable:jsx-no-lambda
import React, { useEffect, useState } from 'react';

import labels from '../config/labels.en';

import './HeaderSearch.scss';

export default function HeaderSearch(props: any) {
  return (
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
  );
}
