import fs from "fs/promises";

import { Route } from "../../../Route/Route";
import { LocationParameter } from "../../../Route/type";
import { DataTransform } from "../Component/DataTransform/DataTransform";
import { MediaData } from "../Component/MediaData/MediaData";
import { Parameter } from "../Component/Parameter/Parameter";

import { Path, SwaggerParameter, SwaggerDataTransform, SwaggerResponses } from "../type";
import { SwaggerBuilder } from "./SwaggerBuilder";
import { BaseSchema, TYPES } from "../Component/Schema/BaseSchema";
import { IRoutePlugin, RoutePlugin } from "../../../Route/RoutePlugin";
import { RouteStreamData } from "../../../Route/RouteStreamData";

export class SwaggerLoader implements IRoutePlugin {
  createPlugin(): RoutePlugin {
    return {
      afterCreateRoute: (routes: Route[]) => this.loadPath(routes),
    };
  }

  /**
   * Generate swagger options ui and save file
   * @param routes
   * @returns
   */
  async loadPath(routes: Route[]) {
    const options = SwaggerBuilder.Instance;

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (!route.isAPI()) continue;
      const path: Path = {
        description: route.description ?? "",
        summary: route.summary ?? "",
        tags: route.tags,
        operationId: route.code ?? "",
        requestBody: this.createRequestBody(route) ?? undefined,
        responses: this.createResponse(route) ?? undefined,
        parameters: this.createParameters(route) ?? undefined,
        security: this.createSecurity(route.security) ?? undefined,
      };

      options.insertApi(route.url ?? "", route.method ?? "", path);
    }

    await fs.writeFile(SwaggerBuilder.Instance.PathFile, JSON.stringify(options.Options));

    return options.Options;
  }

  private createRequestBody(route: Route): SwaggerDataTransform | null {
    if (!route.request) return null;

    const request = route.request;
    if (request instanceof RouteStreamData)
      return new DataTransform(new MediaData().createByFile(request as RouteStreamData)).genSwagger();

    if (request.decorators) {
    }

    return new DataTransform(new MediaData().fromRoute(request.data)).genSwagger();
  }

  private createResponse(route: Route): SwaggerResponses | null {
    let resOpts: SwaggerResponses = {};
    if (!route.response) return null;
    const response = route.response;

    if (response instanceof RouteStreamData)
      resOpts.default = new DataTransform(new MediaData().createByFile(response)).genSwagger();
    else {
      const prefixs = Object.keys(response.data);

      for (let i = 0; i < prefixs.length; i++) {
        const prefix = prefixs[i];
        resOpts[prefix] = new DataTransform(new MediaData().fromRoute(response.data[prefix])).genSwagger();
      }
    }
    return resOpts;
  }

  private createParameters(route: Route): SwaggerParameter[] | null {
    if (!route.parameters) return null;
    const locations = ["path", "cookie", "query", "header"];
    const parameters: SwaggerParameter[] = [];
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i] as LocationParameter;
      const locationObject = (route.parameters[location] as any) ?? {};
      const keys = Object.keys(locationObject);
      for (let j = 0; j < keys.length; j++) {
        const params = locationObject[keys[j]];
        parameters.push(new Parameter().fromRoute(params, location, keys[j], location === "path").genSwagger());
      }
    }

    return parameters;
  }

  private createSecurity(security?: string[] | boolean): Array<Record<string, string[]>> | undefined {
    if (security === undefined) return undefined;
    if (new BaseSchema().getType(security) === TYPES.BOOLEAN) return [{ ["default"]: [] }];

    return (security as string[]).map((e) => {
      return { e: [] };
    });
  }
}
