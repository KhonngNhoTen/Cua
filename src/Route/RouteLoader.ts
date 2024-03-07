import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { Route } from "./Route";
import {
  AfterCreateRoute,
  BeforeCreateRoute,
  IRoutePlugin,
  RegisterMiddleware,
  isIRoutePlugin,
  RoutePlugin,
} from "./RoutePlugin";
import { InputRouteSchema, NormalizationRoute, RouteSchema } from "./type";

type RouteLoaderOptions = {
  normalization?: NormalizationRoute;
  plugins?: IRoutePlugin[] | RoutePlugin[];
};
class RouteLoader {
  private normalization: NormalizationRoute = normalizationRoute;
  private beforeCreateRouteHooks: BeforeCreateRoute[] = [];
  private afterCreateRouteHooks: AfterCreateRoute[] = [];
  private registerMiddlewareHooks: RegisterMiddleware[] = [];

  private apis: Route[] = [];

  private static instance: RouteLoader;
  static get Instance(): RouteLoader {
    if (!RouteLoader.instance) RouteLoader.instance = new RouteLoader();

    return RouteLoader.instance;
  }

  private createRoute(input: InputRouteSchema, parentSchema?: InputRouteSchema): Route {
    let routeSchema: RouteSchema = {};
    const childs: Route[] = [];
    for (let i = 0; i < this.beforeCreateRouteHooks.length; i++)
      routeSchema = this.beforeCreateRouteHooks[i](input, routeSchema, parentSchema);

    for (let i = 0; input.childs && i < input.childs.length; i++) childs.push(this.createRoute(input.childs[i], input));

    if (childs.length > 0) routeSchema.childs = childs;

    return new Route(routeSchema);
  }

  private addHooks(plugins: IRoutePlugin[] | RoutePlugin[]) {
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      const hooks = isIRoutePlugin(plugin) ? plugin.createPlugin() : plugin;
      if (hooks.afterCreateRoute) this.afterCreateRouteHooks.push(hooks.afterCreateRoute);
      if (hooks.beforeCreateRoute) this.beforeCreateRouteHooks.push(hooks.beforeCreateRoute);
      if (hooks.registerMiddleware) this.registerMiddlewareHooks.push(hooks.registerMiddleware);
    }
  }

  private async registerMiddlewares(routes: Route[], router: any) {
    const globalMiddlewares: any[] = [];
    routes.forEach((route) => {
      route.registry(router, globalMiddlewares);
    });
  }

  config(options: RouteLoaderOptions) {
    this.normalization = options?.normalization ?? normalizationRoute;
    if (options.plugins) this.addHooks(options.plugins);
  }

  addRoute(input: InputRouteSchema) {
    const route = this.createRoute(input);
    this.apis.push(...route.listRoutes());
  }

  async load(router: any) {
    for (let i = 0; i < this.afterCreateRouteHooks.length; i++) await this.afterCreateRouteHooks[i](this.apis);
    await this.registerMiddlewares(this.apis, router);
    console.log("Load list of api !!!");
  }
}

export default RouteLoader;
