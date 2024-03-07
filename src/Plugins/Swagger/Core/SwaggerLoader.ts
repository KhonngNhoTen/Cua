import fs from "fs/promises";

import { Route } from "../../Route/Route";
import { BaseRouteDataTransform } from "../../Route/IRouteDataTransform";
import { LocationParameter, RouteDataTransform } from "../../Route/type";
import { DataTransform } from "../Component/DataTransform/DataTransform";
import { MediaData } from "../Component/MediaData/MediaData";
import { Parameter } from "../Component/Parameter/Parameter";

import { Path, SwaggerParameter, SwaggerDataTransform, SwaggerResponses } from "../type";
import { SwaggerBuilder } from "./SwaggerBuilder";
import { BaseSchema, TYPES } from "../Component/Schema/BaseSchema";
import { IRouteHandler, RouteHandler } from "../../Route/RouteHandler";

export class SwaggerLoader implements IRouteHandler {
  genRouteHandler(): RouteHandler {
    return {
      updateByRoute: async (routes) => await this.handler(routes),
    };
  }
  /**
   * Generate swagger options ui and save file
   * @param routes
   * @returns
   */
  async handler(routes: Route[]) {
    const options = SwaggerBuilder.Instance;

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (!route.isAPI()) continue;
      const path: Path = {
        description: route.description ?? "",
        summary: route.summary ?? "",
        tags: route.tags,
        operationId: route.code,
        requestBody: this.createRequestBody(route) ?? undefined,
        responses: this.createResponse(route),
        parameters: this.createParameters(route) ?? undefined,
        security: this.createSecurity(route.security) ?? undefined,
      };

      options.insertApi(route.url ?? "", route.method, path);
    }

    await fs.writeFile(SwaggerBuilder.Instance.PathFile, JSON.stringify(options.Options));
    return options.Options;
  }

  createRequestBody(route: Route): SwaggerDataTransform | null {
    if (!route.request) return null;
    if (route.request instanceof BaseRouteDataTransform) return route.request.dataTransform().genSwagger();
    return new DataTransform(new MediaData().fromRoute(route.request)).genSwagger();
  }

  createResponse(route: Route): SwaggerResponses {
    let resOpts: SwaggerResponses = {};
    if (SwaggerLoader.isWrapperRepsonse(route.response)) {
      const status = Object.keys(route.response);
      for (let i = 0; i < status.length; i++) {
        const response = (route.response as Record<string, RouteDataTransform | BaseRouteDataTransform>)[status[i]];

        // const media = response instanceof MediaData ? response : new MediaData().fromRoute(response);
        const dataTransform =
          response instanceof BaseRouteDataTransform
            ? response.dataTransform()
            : new DataTransform(new MediaData().fromRoute(response));

        resOpts[status[i]] = dataTransform.genSwagger();
      }
    } else {
      const dataTransform =
        route.response instanceof BaseRouteDataTransform
          ? route.response.dataTransform()
          : new DataTransform(new MediaData().fromRoute(route.response));

      resOpts.default = dataTransform.genSwagger();
    }
    return resOpts;
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
        parameters.push(new Parameter().fromRoute(params, location, keys[j], location === "path").genSwagger());
      }
    }

    return parameters;
  }

  createSecurity(security?: string[] | boolean): Array<Record<string, string[]>> | undefined {
    if (security === undefined) return undefined;
    if (new BaseSchema().getType(security) === TYPES.BOOLEAN) return [{ ["default"]: [] }];

    return (security as string[]).map((e) => {
      return { e: [] };
    });
  }

  static isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}
