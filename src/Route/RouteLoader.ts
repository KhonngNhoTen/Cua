import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { IRouteHandler } from "./IRouteHandler";
import { Route } from "./Route";
import { NormalizationRoute } from "./type";

type RouteLoaderOptions = {
  normalization?: NormalizationRoute;
  routeHandlers?: IRouteHandler[];
};
class RouteLoader implements IRouteHandler {
  private normalization: NormalizationRoute;
  private routeHandlers: IRouteHandler[];

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
    for (let i = 0; i < this.routeHandlers.length; i++) data = await this.routeHandlers[i].handler(routes, data);

    await this.handler(routes, router);

    console.log("Done registry apis");
  }
}

export default RouteLoader;
