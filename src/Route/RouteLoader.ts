import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { Route } from "./Route";
import { IRouteHandler, isIRouteHandler, RouteHandler } from "./RouteHandler";
import { NormalizationRoute } from "./type";

type RouteLoaderOptions = {
  normalization?: NormalizationRoute;
  routeHandlers?: IRouteHandler[] | RouteHandler[];
};
class RouteLoader {
  private normalization: NormalizationRoute;
  private routeHandlers: IRouteHandler[] | RouteHandler[];

  constructor(options: RouteLoaderOptions) {
    this.normalization = options?.normalization ?? normalizationRoute;
    this.routeHandlers = options?.routeHandlers ?? [];
  }

  async handler(routes: Route[], router: any) {
    routes.forEach((route) => {
      route.registry(router);
    });
  }

  async load(routes: Route[], router: any) {
    let data;
    for (let i = 0; i < this.routeHandlers.length; i++) {
      const routeHandler = this.routeHandlers[i];
      let handler = routeHandler as RouteHandler;
      if (isIRouteHandler(routeHandler)) handler = routeHandler.genRouteHandler();
      if (handler.updateByRoute) data = await handler.updateByRoute(routes, data);
    }

    await this.handler(routes, router);

    console.log("Done registry apis");
  }
}

export default RouteLoader;
