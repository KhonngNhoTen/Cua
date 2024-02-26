import { Route } from "./Route";

export interface IRouteHandler {
  handler(route: Route[], extraData?: any): Promise<any>;
}
