import React from 'react';
import * as Controls from '../compound/index';

export default function DynamicComponent(props: any) {
  const CustomComponent = (Controls as any).default[props.component];
  return <CustomComponent {...props} />;
}
