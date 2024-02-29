import { Route } from "../Route/Route";
import { IRouteHandler, RouteHandler } from "../Route/RouteHandler";

type SchemaRunnerOptions = {
  validating: boolean;
  customError: any;
};

export class SchemaRunner implements IRouteHandler {
  private validating: boolean;
  private customError: any;
  constructor(options: SchemaRunnerOptions) {
    this.validating = options.validating ?? true;
    this.customError = this.customError;
  }

  genRouteHandler(): RouteHandler {
    return {
      middleware: this.validating ? this.genMiddleware : undefined,
      updateRoute: this.updateRoute,
    };
  }

  private async updateRoute(routes: Route[], extraData: any) {}

  private genMiddleware(route: Route, extraData: any) {
    return async function () {};
  }
}
