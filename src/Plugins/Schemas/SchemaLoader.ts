import { Route } from "../../Route/Route";
import { IRoutePlugin, MiddlewareFunction, RoutePlugin } from "../../Route/RoutePlugin";
import { RouteRequest } from "../../Route/RouteRequest";
import { RouteResponse } from "../../Route/RouteResponse";
import { InputRouteSchema, RouteDecorAttribute, RouteSchema } from "../../Route/type";
import { Schema, SchemaDecorations } from "./Schema";

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
      // registerMiddleware: this.createMiddleware,
    };
  }

  /**
   * For request and reponse. Type is allowed:
   * - Schema
   * - Record <string, Schema>
   */
  private beforeCreateRoute(input: InputRouteSchema, outSchema: RouteSchema) {
    if (input.request) {
      const request = this.parseRoute(input.request, true);
      if (request && request instanceof RouteRequest) outSchema.request = request;
    }
    if (input.response) {
      const response = this.parseRoute(input.response, false);
      if (response && response instanceof RouteResponse) outSchema.response = response;
    }
    return outSchema;
  }

  private parseRoute(data: any, isRequest: boolean = true): RouteRequest | RouteResponse | undefined {
    const ClassData = isRequest ? RouteRequest : RouteResponse;
    if (data instanceof Schema && data.decorations)
      return new ClassData(undefined, data.decorations as RouteDecorAttribute);

    if (typeof data === "object" && !isRequest) {
      const newData: Record<string, SchemaDecorations> = {};
      for (const [key, val] of Object.entries(data))
        if (val instanceof Schema && val.decorations) newData[key] = val.decorations;
      if (Object.keys(newData).length > 0) return new ClassData(undefined, newData);
    }

    return;
  }

  private async createMiddleware(route: Route) {
    return this.middleware;
  }

  private async middleware(req: any, res: any, next: any, extraData: any) {}
}
