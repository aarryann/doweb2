// tslint:disable
import React from 'react';
declare const process: IProcess;

export default function PageContextComponent(props: any) {
  const setContext = (markers: any) => {
    const token = localStorage.getItem(
      process.env.REACT_CONTEXT_TOKEN_NAME || 'contextToken'
    );

    if (token) {
      const tokenMarkers = JSON.parse(token);
      for (let i = 0; i < markers.length; i++) {
        if (!sessionStorage.getItem(markers[i])) {
          sessionStorage.setItem(props.markers[i], tokenMarkers[markers[i]]);
        }
      }
    } else {
      for (let i = 0; i < markers.length; i++) {
        if (!sessionStorage.getItem(markers[i])) {
          sessionStorage.removeItem(markers[i]);
        }
      }
    }
  };

  setContext(props.markers);
  return (
    <div className="context-header">
      <h4>Context Header</h4>
    </div>
  );
}
