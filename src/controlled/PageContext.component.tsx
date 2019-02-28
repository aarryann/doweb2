// tslint:disable
import React, { useState } from 'react';
declare const process: IProcess;
import './PageContext.component.scss';

export default function PageContextComponent(props: any) {
  const [clipped, setClipped] = useState(false);
  const handleClipHeader = () => {
    setClipped(clip => !clip);
  };
  return (
    <div className={`context-header ${clipped ? 'small-header' : ''}`}>
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
