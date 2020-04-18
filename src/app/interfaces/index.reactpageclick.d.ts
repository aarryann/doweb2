declare module 'react-page-click' {
  import React from 'react';
  export interface IPageClickProps {
    outsideOnly?: boolean;
    notifyOnTouchEnd?: boolean;
    children: any;
    notify(...args: any[]): void;
    onMouseDown?(...args: any[]): void;
    onTouchStart?(...args: any[]): void;
  }

  class PageClick extends React.PureComponent<IPageClickProps, any> {}

  export default PageClick;
}
