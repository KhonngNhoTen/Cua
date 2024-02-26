import { Route } from "./Route";

export interface IRouteHandler {
  handler(route: Route[], request: any, extraData?: any): Promise<any>;
}
