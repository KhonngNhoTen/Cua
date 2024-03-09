import { Route } from "../../Route/Route";
import { IRoutePlugin, MiddlewareFunction, RoutePlugin } from "../../Route/RoutePlugin";
import { InputRouteSchema, RouteSchema } from "../../Route/type";

type SchemaLoaderOptions = {
  validating: boolean;
  customError?: any;
};

export class SchemaLoader implements IRoutePlugin {
  private validating: boolean;
  private customError?: any;
  constructor(options: SchemaLoaderOptions) {
    this.validating = options.validating ?? true;
    this.customError = this.customError;
  }
  createPlugin(): RoutePlugin {
    return {
      beforeCreateRoute: this.beforeCreateRoute,
      registerMiddleware: this.createMiddleware,
    };
  }

  private beforeCreateRoute(input: InputRouteSchema, outSchema: RouteSchema) {
    return {
      code: input.code,
    };
  }

  private async createMiddleware(route: Route) {
    return this.middleware;
  }

  private async middleware(req: any, res: any, next: any, extraData: any) {}
}
