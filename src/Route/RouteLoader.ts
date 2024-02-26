import { glob } from "glob";
import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { IRouteHandler } from "./IRouteHandler";
import Route from "./Route";
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
      request[route.method](route.url, route.middlewares);
    });
  }

  async load(path: string, request: any) {
    let routes: Route[] = [];

    /** Load all route by pattern file name. */
    const files = glob.globSync(path.replace(/\\/g, "/"));
    for (let i = 0; i < files.length; i++) {
      const route = new Route(require(files[i]));
      routes = [...routes, ...route.listRoutes()];
    }

    /**  Call handler in list. */
    let data;
    for (let i = 0; i < this.routeHandlers.length; i++)
      data = await this.routeHandlers[i].handler(routes, request, data);
    return this;
  }

  done(callback: Function) {
    callback();
    return this;
  }

  addHandlers(routeHandlers: IRouteHandler[]) {
    this.routeHandlers = [...routeHandlers, ...this.routeHandlers];
    return this;
  }

  addRouteNormalization(normalization: NormalizationRoute) {
    this.normalization = normalization;
    return this;
  }
}

export default RouteLoader;
