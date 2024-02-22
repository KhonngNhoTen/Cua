import Route from "../../Route/Route";
import { RouteParameter } from "../../Route/type";
import Parameter from "../Components/Parameter";
import RequestBody from "../Components/RequestBody";
import Response from "../Components/Response";
import { BaseSchema } from "../SwaggerSchema/BaseSchema";
import { Schema } from "../SwaggerSchema/Schema";
import { SwaggerExportSchema, Path, SwaggerParameter } from "../type";
import SwaggerBuilder from "./SwaggerBuilder";

class SwaggerLoader {
  private routes: Route[] = [];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  genSwagger(): SwaggerExportSchema {
    const options = SwaggerBuilder.Instance();

    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const path: Path = {
        description: route.description ?? "",
        summary: route.summary ?? "",
        tags: [],
        operationId: route.code,
        requestBody: this.createRequestBody(route),
        responses: new Response().genSwagger(),
        parameters: this.createParameters(route),
      };

      options.insertApi(route.url, route.method, path);
    }

    return options.Options;
  }

  createRequestBody(route: Route): RequestBody {
    if (route.request instanceof BaseSchema) return new RequestBody(route.request);
    return new RequestBody(new Schema(route.request));
  }

  createParameters(route: Route): SwaggerParameter[] {
    const parameters: SwaggerParameter[] = [];
    if (route.queries) {
      const keys = Object.keys(route.queries);
      for (let i = 0; i < keys.length; i++) {
        const query = route.queries[keys[i]];
        const schema = query instanceof Schema ? query : new Schema(query);
        parameters.push(new Parameter(schema, "query").genSwagger());
      }
    }

    if (route.params) {
      const keys = Object.keys(route.params);
      for (let i = 0; i < keys.length; i++) {
        const param = route.params[keys[i]];
        const schema = param instanceof Schema ? param : new Schema(param);
        parameters.push(new Parameter(schema, "path").genSwagger());
      }
    }
    return parameters;
  }
}

export default SwaggerLoader;
