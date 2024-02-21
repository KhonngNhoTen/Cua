import Route from "../../Route/Route";
import Parameter from "../Components/Parameter";
import { SchemaFactory } from "../Schema/SchemaFactory";
import { SwaggerExportSchema, Path } from "../type";
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
        requestBody: SchemaFactory.create(route.request),
        parameters: [...Parameter.from("query", route.queries), ...Parameter.from("path", route.params)],
      };

      options.insertApi(route.url, route.method, path);
    }

    return options.Options;
  }
}

export default SwaggerLoader;
