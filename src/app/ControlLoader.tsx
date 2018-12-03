import React from 'react';
import * as Controls from '../controlled';

export default function ControlLoader(props: any) {
  const LoadedComponent = (Controls as any).default[props.component];
  return <LoadedComponent {...props} />;
}
