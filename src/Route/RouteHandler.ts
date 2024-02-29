import { Route } from "./Route";

export type UpdateRouteFunction = (routes: Route[], extraData: any) => Promise<any>;
export type MiddlewareFunction = (req: any, res: any, next: any, extraData: any) => Promise<any>;
export type CreateMiddlewareFunction = (routes: Route, extraData: any) => MiddlewareFunction;
export type RouteHandler = {
  updateRoute?: UpdateRouteFunction;
  middleware?: CreateMiddlewareFunction;
};

export interface IRouteHandler {
  genRouteHandler(): RouteHandler;
}

export function isIRouteHandler(object: any): object is IRouteHandler {
  return (object as IRouteHandler).genRouteHandler !== undefined;
}
