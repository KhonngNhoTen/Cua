import { RouteParameter, RouteRequest, RouteResponse, RouteSchema } from "./type";

export class Route {
  code?: string = "";
  url?: string;
  baseUrl?: string;
  method: string = "";
  description: string = "";
  summary: string = "";
  tags?: string[];
  middlewares: Promise<void>[] = [];
  handler?: (...params: any) => Promise<void>;
  request?: RouteRequest;
  response?: RouteResponse = {};
  parameters?: RouteParameter;
  childs?: Route[];
  security?: string[] | boolean;

  constructor(schema: RouteSchema) {
    this.code = schema.code;
    this.middlewares = schema.middlewares ?? [];
    this.handler = schema.handler;
    this.baseUrl = schema.baseUrl;
    this.tags = schema.tags;
    this.security = schema.security;

    this.parameters = schema.parameters;
    this.response = schema.response;
    this.request = schema.request;
    this.childs = schema.childs;
  }

  registry(req: any, globalMiddlewares: any[] = []) {
    if (this.isAPI()) {
      const middlewares = [...this.middlewares, ...globalMiddlewares, this.handler];
      req[this.method](this.url, middlewares);
    }
  }

  listRoutes() {
    const routes: Route[] = [];
    if (this.isAPI()) routes.push(this);
    if (this.childs) this.childs.forEach((e) => routes.push(...e.listRoutes()));
    return routes;
  }

  isAPI() {
    return !this.baseUrl;
  }
}
