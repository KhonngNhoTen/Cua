import { Route } from "../Route/Route";
import { IRouteHandler, RouteHandler } from "../Route/RouteHandler";
import { RouteDataTransform } from "../Route/type";
import { Schema } from "./Schema";

type SchemaRunnerOptions = {
  validating: boolean;
  customError?: any;
};

export class SchemaRunner implements IRouteHandler {
  private validating: boolean;
  private customError?: any;
  constructor(options: SchemaRunnerOptions) {
    this.validating = options.validating ?? true;
    this.customError = this.customError;
  }

  genRouteHandler(): RouteHandler {
    return {
      // middleware: this.validating ? this.genMiddleware : undefined,
      updateByRoute: async (routes: Route[]) => await this.updateRoute(routes),
    };
  }

  private async updateRoute(routes: Route[], extraData: any) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.request instanceof Schema) route.request = route.request.data;
      if (route.response instanceof Schema) route.response = route.response.data;

      if (route.response instanceof Object) {
        const responses: Record<string, RouteDataTransform> = {};
        for (const [key, value] of Object.entries(route.response)) {
          if (!(value instanceof Schema)) throw new Error("Type not support");
          responses[key] = value.data as RouteDataTransform;
        }
        route.response = responses;
      }
    }
  }

  private genMiddleware(route: Route, extraData: any) {
    return async function () {};
  }
}
