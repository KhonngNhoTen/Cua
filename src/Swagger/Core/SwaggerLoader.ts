import { glob } from "glob";
import fs from "fs/promises";

import { IRouteHandler } from "../../Route/IRouteHandler";
import Route from "../../Route/Route";
import { LocationParameter } from "../../Route/type";
import { DataTransform } from "../Component/DataTransform/DataTransform";
import { MediaData } from "../Component/MediaData/MediaData";
import { Parameter } from "../Component/Parameter/Parameter";

import { Path, SwaggerParameter, SwaggerDataTransform, SwaggerResponses } from "../type";
import { SwaggerBuilder } from "./SwaggerBuilder";

export class SwaggerLoader implements IRouteHandler {
  async load(path: string) {
    let routes: Route[] = [];

    /** Load all route by pattern file name. */
    const files = glob.globSync(path.replace(/\\/g, "/"));
    for (let i = 0; i < files.length; i++) {
      const route = new Route(require(files[i]));
      routes = [...routes, ...route.listRoutes()];
    }
    return routes;
  }

  async handler(routes: Route[]) {
    const options = SwaggerBuilder.Instance();

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const path: Path = {
        description: route.description ?? "",
        summary: route.summary ?? "",
        tags: route.tags,
        operationId: route.code,
        requestBody: this.createRequestBody(route) ?? undefined,
        responses: this.createResponse(route),
        parameters: this.createParameters(route) ?? undefined,
        security: route.security ?? undefined,
      };

      options.insertApi(route.url, route.method, path);
      await fs.writeFile(SwaggerBuilder.Instance().pathFile, JSON.stringify(SwaggerBuilder.Instance().Options));
    }
  }

  createRequestBody(route: Route): SwaggerDataTransform | null {
    if (!route.request) return null;
    if (route.request instanceof MediaData) return new DataTransform(route.request).genSwagger();
    return new DataTransform(new MediaData().fromRoute(route.request)).genSwagger();
  }

  createParameters(route: Route): SwaggerParameter[] | null {
    if (!route.parameters) return null;
    const locations = ["path", "cookie", "query", "header"];
    const parameters: SwaggerParameter[] = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i] as LocationParameter;
      const locationObject = (route.parameters[location] as any) ?? {};
      const keys = Object.keys(locationObject);
      for (let j = 0; j < keys.length; j++) {
        const params = locationObject[keys[j]];
        parameters.push(new Parameter().fromRoute(params, location, keys[j]).genSwagger());
      }
    }

    return parameters;
  }

  createResponse(route: Route): SwaggerResponses {
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
}
