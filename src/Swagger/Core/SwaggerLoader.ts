import Route from "../../Route/Route";
import Parameter from "../Components/Parameter";
import RequestBody from "../Components/RequestBody";
import Response from "../Components/Response";
import { BaseSchema } from "../SwaggerSchema/BaseSchema";
import { Schema } from "../SwaggerSchema/Schema";
import { SwaggerExportSchema, Path, SwaggerParameter, SwaggerResponse } from "../type";
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
        responses: this.createResponse(route),
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

  createResponse(route: Route): SwaggerResponse {
    let resOpts: SwaggerResponse = {};
    if (Response.isWrapperRepsonse(route.response)) {
      const status = Object.keys(route.response);
      for (let i = 0; i < status.length; i++) {
        const response = route.response[status[i]];
        const schema = response instanceof BaseSchema ? response : new Schema(response);
        resOpts[status[i]] = new Response(schema, status[i]).genSwagger();
      }
    } else {
      const schema = route.response instanceof BaseSchema ? route.response : new Schema(route.response);
      resOpts = new Response(schema).genSwagger();
    }
    return resOpts;
  }
}

export default SwaggerLoader;
