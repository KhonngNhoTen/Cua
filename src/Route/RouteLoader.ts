import { glob } from "glob";
import normalizationRoute from "../RouteNormalization/RouteNormalization";
import { InputRouteHelper } from "../Plugins/InputRouteHelper";
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
  path: string;
};
class RouteLoader {
  private normalization: NormalizationRoute = normalizationRoute;
  private beforeCreateRouteHooks: BeforeCreateRoute[] = [];
  private afterCreateRouteHooks: AfterCreateRoute[] = [];
  private registerMiddlewareHooks: RegisterMiddleware[] = [];
  private path: string = "";
  private apis: Route[] = [];

  constructor(options?: RouteLoaderOptions) {
    this.normalization = options?.normalization ?? normalizationRoute;
    const plugins = options?.plugins ? [...options?.plugins, new InputRouteHelper()] : [new InputRouteHelper()];
    this.addHooks(plugins);
    if (options?.path) {
      this.path = options.path;
    }
    return this;
  }

  private static instance: RouteLoader;
  static get Instance(): RouteLoader {
    if (!RouteLoader.instance) RouteLoader.instance = new RouteLoader();

    return RouteLoader.instance;
  }
  static addRoute(input: InputRouteSchema) {
    const instance = RouteLoader.Instance;
    const route = RouteLoader.createRoute(instance, input);
    instance.apis.push(...route.listRoutes());
  }

  private static createRoute(loader: RouteLoader, input: InputRouteSchema, parentSchema?: InputRouteSchema): Route {
    let routeSchema: RouteSchema = { ...input } as RouteSchema;
    delete routeSchema.response;
    delete routeSchema.request;
    delete routeSchema.parameters;
    const childs: Route[] = [];
    for (let i = 0; i < loader.beforeCreateRouteHooks.length; i++)
      routeSchema = loader.beforeCreateRouteHooks[i](input, routeSchema, parentSchema);

    for (let i = 0; input.childs && i < input.childs.length; i++)
      childs.push(this.createRoute(loader, input.childs[i], input));

    if (childs.length > 0) routeSchema.childs = childs;

    return new Route(routeSchema, parentSchema);
  }

  static config(options: RouteLoaderOptions) {
    RouteLoader.instance = new RouteLoader(options);
    return RouteLoader.instance;
  }

  private addHooks(plugins: Array<IRoutePlugin | RoutePlugin>) {
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

  async load(router: any) {
    glob.sync(this.path.replace(/\\/g, "/")).forEach((e) => require(e));

    for (let i = 0; i < this.afterCreateRouteHooks.length; i++) await this.afterCreateRouteHooks[i](this.apis);
    await this.registerMiddlewares(this.apis, router);
    console.log("Load list of api !!!");
  }
}

export default RouteLoader;
