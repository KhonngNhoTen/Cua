import fs from "fs/promises";
import Route from "../../Route/Route";
import { LocationParameter, RouteDataTransform } from "../../Route/type";
import { DataTransform } from "../Component/DataTransform/DataTransform";
import { MediaData } from "../Component/MediaData/MediaData";
import { Parameter } from "../Component/Parameter/Parameter";

import { SwaggerExportSchema, Path, SwaggerParameter, SwaggerDataTransform, SwaggerResponses } from "../type";
import { SwaggerBuilder } from "./SwaggerBuilder";

export class SwaggerLoader {
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
        tags: route.tags,
        operationId: route.code,
        requestBody: this.createRequestBody(route),
        responses: this.createResponse(route),
        parameters: this.createParameters(route),
        security: route.security ?? {},
      };

      options.insertApi(route.url, route.method, path);
    }

    return options.Options;
  }

  createRequestBody(route: Route): SwaggerDataTransform {
    console.log("request body");
    if (route.request instanceof MediaData) return new DataTransform(route.request).genSwagger();
    return new DataTransform(new MediaData().fromRoute(route.request)).genSwagger();
  }

  createParameters(route: Route): SwaggerParameter[] {
    console.log("request parameters");

    const locations = ["path", "cookie", "query", "header"];
    const parameters: SwaggerParameter[] = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i] as LocationParameter;
      const locationObject = (route.parameters[location] as any) ?? {};
      const keys = Object.keys(locationObject);
      for (let j = 0; j < keys.length; j++) {
        const params = locationObject[keys[j]];
        parameters.push(new Parameter().fromRoute(params, location, keys[i]).genSwagger());
      }
    }

    return parameters;
  }

  createResponse(route: Route): SwaggerResponses {
    console.log("request response");

    let resOpts: SwaggerResponses = {};
    if (SwaggerLoader.isWrapperRepsonse(route.response)) {
      const status = Object.keys(route.response);
      for (let i = 0; i < status.length; i++) {
        const response = route.response[status[i]];
        const media = response instanceof MediaData ? response : new MediaData().fromRoute(route.response);
        const dataTransform = new DataTransform(media as MediaData);
        resOpts[status[i]] = dataTransform.genSwagger();
      }
    } else {
      const media = route.response instanceof MediaData ? route.response : new MediaData().fromRoute(route.response);
      const dataTransform = new DataTransform(media as MediaData);
      resOpts.default = dataTransform.genSwagger();
    }
    return resOpts;
  }

  static isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }

  async writeFile(path: string) {
    await fs.writeFile(path, JSON.stringify(SwaggerBuilder.Instance().Options));
  }
}
