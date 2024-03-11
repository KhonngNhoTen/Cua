import { Route } from "../../Route/Route";
import { IRoutePlugin, MiddlewareFunction, RoutePlugin } from "../../Route/RoutePlugin";
import { RouteRequest } from "../../Route/RouteRequest";
import { RouteResponse } from "../../Route/RouteResponse";
import { InputRouteSchema, RouteSchema } from "../../Route/type";
import { Schema } from "./Schema";

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

  /**
   * For request and reponse. Type is allowed:
   * - Schema
   * - Array<Schema>
   * - Record <string, Schema>
   * 
   * And mixed type:
   * - Arrray<Request|Response|Schema>
   * - Record<string,Request|Response|Schema>
   */
  private beforeCreateRoute(input: InputRouteSchema, outSchema: RouteSchema) {
    if(input.request) {
      const request = this.parseRoute(input.request);
      if(request && request instanceof RouteRequest) input.request =request;
    }
    if(input.response) {
      const response = this.parseRoute(input.response);
      if(response && response instanceof RouteResponse) input.response =response;
    }
    return {
      code: input.code,
    };
  }


  private parseRoute(data: any): RouteRequest | RouteResponse | undefined {

    if (data instanceof Schema) {
      this.Schema2Route(data)
    }
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++)
        if (data[i] instanceof Schema)
          this.Schema2Route(data[i]);

    }

    if (typeof data === 'object') {
      for (const [key, val] of Object.entries(data))
        if (val instanceof Schema)
          this.Schema2Route(val)
    }

    return;
  }

  private Schema2Route(schema: Schema) {

  }


  private async createMiddleware(route: Route) {
    return this.middleware;
  }

  private async middleware(req: any, res: any, next: any, extraData: any) { }
}
