import { Route } from "./Route";
import { InputRouteSchema, RouteSchema } from "./type";

export type MiddlewareFunction = (req: any, res: any, next: any, extraData: any) => Promise<any>;

export type BeforeCreateRoute = (
  schema: InputRouteSchema,
  outSchenma: RouteSchema,
  wrapperSchema?: InputRouteSchema
) => RouteSchema;
export type AfterCreateRoute = (routes: Route[]) => Promise<any>;
export type RegisterMiddleware = (route: Route) => Promise<MiddlewareFunction>;

/**
 * LIST OF HOOOK:
 * - beforeCreateRoute
 * - afterCreateRoute
 * - registerMiddleware
 */

export type RoutePlugin = {
  /**
   * This function is used to format input data for contructor of Route-class
   */
  beforeCreateRoute?: BeforeCreateRoute;

  /**
   * This function's called whenever list of route is created
   * It is used to handle routes data, insert any object into database or do whatever you want.
   */
  afterCreateRoute?: AfterCreateRoute;

  /**
   * Create a middleware and insert it into chunks-middlewares
   */
  registerMiddleware?: RegisterMiddleware;
};

export interface IRoutePlugin {
  createPlugin(): RoutePlugin;
}

export function isIRoutePlugin(object: any): object is IRoutePlugin {
  return (object as IRoutePlugin).createPlugin !== undefined;
}
