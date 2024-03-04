import { BaseRouteDataTransform } from "./BaseRouteDataTransform";
import { RouteDataTransform, RouteParameter, RouteSchema } from "./type";

export class Route {
  code: string = "";
  url?: string;
  baseUrl?: string;
  method: string = "";
  description: string = "";
  summary: string = "";
  tags?: string[];
  middlewares: Promise<void>[] = [];
  handler?: (...params: any) => Promise<void>;
  request?: Object | BaseRouteDataTransform;
  response: Record<string, RouteDataTransform | BaseRouteDataTransform> | BaseRouteDataTransform = {};
  parameters?: RouteParameter;
  childs: Route[];
  security?: string[] | boolean;

  constructor(schema: RouteSchema, parentSchema?: RouteSchema) {
    this.code = schema.code;
    this.middlewares = schema.middlewares ?? [];
    this.handler = schema.handler;
    this.response = schema.response ?? {};
    this.request = schema.request ?? undefined;
    this.baseUrl = schema.baseUrl;
    this.tags = schema.tags ?? parentSchema?.tags;
    this.security = schema.security;

    this.parameters = Array.isArray(schema.parameters)
      ? { query: schema.parameters.reduce((init, val) => ({ ...init, [val]: "" }), {}) }
      : schema.parameters;

    if (schema.url && this.isAPI()) this.getParams(schema.url, parentSchema?.baseUrl);

    this.childs = schema.childs ? this.createChilds(schema.childs, schema) : [];
  }

  protected createChilds(schemas: RouteSchema[], currentSchema?: RouteSchema) {
    if (!schemas || schemas.length < 0) return [];
    return schemas.map((e) => new Route(e, currentSchema));
  }

  getParams(routeUrl: string, baseUrl?: string) {
    let [method, url] = routeUrl.split(" ");
    if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");

    let params: any = {};

    Route.formatUrl2SwaggerPath(url, (param) => (params[param] = ""));
    this.parameters = {
      ...this.parameters,
      path: params,
    };

    this.url = baseUrl ? baseUrl + url : url;
    this.method = method.toLocaleLowerCase();
  }

  static formatUrl2SwaggerPath(url: string, handler: (param: string) => void = () => {}) {
    url = url.replace(/:\w+/g, (param) => {
      param = param.replace(":", "");
      handler(param);
      return `{${param}}`;
    });
    return url;
  }

  registry(req: any) {
    if (this.isAPI()) {
      const middlewares = [...this.middlewares, this.handler];
      req[this.method](this.url, middlewares);
    }
  }

  listRoutes() {
    const routes: Route[] = [];
    if (this.isAPI()) routes.push(this);
    this.childs.forEach((e) => routes.push(...e.listRoutes()));
    return routes;
  }

  isAPI() {
    return !this.baseUrl;
  }
}
