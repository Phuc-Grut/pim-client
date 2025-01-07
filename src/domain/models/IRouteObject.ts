import React from 'react'

export interface RouteObject {
  children?: RouteObject[] | any;
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  meta?: Meta;
}

export interface Meta {
  appLayout?: boolean;
  className?: string;
  layout?: string;
  publicRoute?: boolean;
  restricted?: boolean;
  action?: string;
  resource?: string;
  menuCollapsed?: boolean;
  contentWidth?: string;
  menuHidden?: boolean;
}
