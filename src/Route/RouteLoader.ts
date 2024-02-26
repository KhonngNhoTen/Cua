import { glob } from "glob";
import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { IRouteHandler } from "./IRouteHandler";
import { Route } from "./Route";
import { NormalizationRoute } from "./type";

class RouteLoader implements IRouteHandler {
  private normalization: NormalizationRoute;
  private routeHandlers: IRouteHandler[];

  constructor() {
    this.normalization = normalizationRoute;
    this.routeHandlers = [this];
  }

  async handler(routes: Route[], request: any) {
    routes.forEach((route) => {
      route.registry(request);
    });
  }

  async load(path: string, request: any) {
    this.routeHandlers.push(this);
    let routes: Route[] = [];

    /** Load all route by pattern file name. */
    const files = glob.globSync(path.replace(/\\/g, "/"));
    for (let i = 0; i < files.length; i++) {
      const route = require(files[i]).default;
      routes = [...routes, ...route.listRoutes()];
    }

    /**  Call handler in list. */
    let data;
    for (let i = 0; i < this.routeHandlers.length; i++)
      data = await this.routeHandlers[i].handler(routes, request, data);
    console.log("Done");
    return this;
  }

  addHandlers(routeHandlers: IRouteHandler) {
    this.routeHandlers = [...this.routeHandlers, routeHandlers];
    return this;
  }

  addRouteNormalization(normalization: NormalizationRoute) {
    this.normalization = normalization;
    return this;
  }
}

export default RouteLoader;
