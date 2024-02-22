import { RouteRequest, RouteSchema } from "./type";

class Route {
  code: string = "";
  url: string = "";
  method: string = "";
  description: string = "";
  summary: string = "";
  middlewares: Promise<void>[] = [];
  handler?: Promise<void>;
  request: Object = {};
  response: Record<string, RouteRequest> = {};
  isNull: boolean = false;
  params?: RouteRequest;
  queries?: RouteRequest;
  childs: Route[] = [];

  constructor(schema: RouteSchema) {
    this.code = schema.code;
    this.middlewares = schema.middlewares;
    this.handler = schema.handler;
    this.request = schema.request;
    this.response = schema.response;

    const [method, url] = schema.url.split(" ");

    if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");
    this.url = url;
    this.method = method;

    this.childs = this.createChilds(schema.childs);
  }

  registry(req: any) {
    const middlewares = [...this.middlewares, this.handler];
    req[this.method](middlewares);
  }

  listRoutes() {
    const routes: Route[] = [];
    if (!this.isNull) routes.push(this);
    this.childs.forEach((e) => routes.push(...e.listRoutes()));
    return routes;
  }

  protected createChilds(schemas: RouteSchema[]) {
    if (!schemas || schemas.length < 0) return [];
    return schemas.map((e) => new Route(e));
  }
}

export default Route;
