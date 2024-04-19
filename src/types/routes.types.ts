/* eslint-disable @typescript-eslint/no-explicit-any */
export type RouteObject = {
  children?: RouteObject[];
  element?: any;
  loader?: any;
  key?: string;
  path?: string;
};
