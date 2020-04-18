/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
// tslint:disable
import React, { useState } from 'react';
import './PageContext.component.scss';

interface IPageContextProps {
  dispatch(action: string, payload: any): void;
}

export default function PageContextComponent(props: IPageContextProps) {
  const [clipCss, setClipCss] = useState('');
  const handleClipHeader = () => {
    setClipCss(css => (css.length === 0 ? 'small-header' : ''));
    props.dispatch('setClipCss', clipCss);
  };
  return (
    <div className={`context-header ${clipCss}`}>
      <div className="card">
        <div className="card-body">
          <a
            className="small-header-action"
            onClick={handleClipHeader}
            href="javascript:;"
          >
            <div className="clip-header">
              <i className="fa fa-arrow-up" />
            </div>
          </a>
          <h4>Context Header</h4>
        </div>
      </div>
    </div>
  );
}
