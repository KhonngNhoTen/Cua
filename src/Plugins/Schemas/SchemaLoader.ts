import { Route } from "../../Route/Route";
import { RouteData } from "../../Route/RouteData";
import { IRoutePlugin, RoutePlugin } from "../../Route/RoutePlugin";
import { InputRouteSchema, RouteDecorAttribute, RouteSchema } from "../../Route/type";
import { Schema } from "./Schema";
import { parseRouteDecorations } from "./SchemaParser";
import { isMapSchema } from "./type";

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
      beforeCreateRoute: (input: InputRouteSchema, outSchema: RouteSchema) => this.beforeCreateRoute(input, outSchema),
      registerMiddleware: this.createMiddleware,
    };
  }

  /**
   * For request and reponse. Type is allowed:
   * - Schema
   * - Record <string, Schema>
   */
  private beforeCreateRoute(input: InputRouteSchema, outSchema: RouteSchema) {
    if (input.request && input.request instanceof Schema) {
      const request = new RouteData(undefined, parseRouteDecorations(input.request.validations));
      if (request && request instanceof RouteData) outSchema.request = request;
    }
    if (input.response) {
      let decor: RouteDecorAttribute | undefined = undefined;

      if (input.response instanceof Schema) decor = parseRouteDecorations(input.response.validations);
      else if (isMapSchema(input.response)) {
        decor = { type: "object" };
        for (const [key, value] of Object.entries(input.response))
          decor.decorators?.push(parseRouteDecorations(value, key));
      }
      if (decor) {
        outSchema.response = new RouteData(undefined, decor);
      }
    }
    return outSchema;
  }

  private async createMiddleware(route: Route) {
    if (route.request instanceof Schema) {
    }
    return null;
  }

  private async middleware(req: any, res: any, next: any, extraData: any) {}
}
