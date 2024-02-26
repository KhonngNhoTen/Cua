import { RouteDataTransform, RouteParameter, RouteSchema } from "./type";

class Route {
  code: string = "";
  url: string = "";
  method: string = "";
  description: string = "";
  summary: string = "";
  tags: string[] = [];
  middlewares: Promise<void>[] = [];
  handler?: Promise<void>;
  request?: Object;
  response: Record<string, RouteDataTransform> = {};
  isNull: boolean = false;
  parameters?: RouteParameter;
  childs: Route[] = [];
  security: any;

  constructor(schema: RouteSchema) {
    this.code = schema.code;
    this.middlewares = schema.middlewares ?? [];
    this.handler = schema.handler;
    this.response = schema.response ?? {};
    this.request = schema.request ?? undefined;
    this.parameters = schema.parameters ?? undefined;

    if (schema.url) {
      const [method, url] = schema.url.split(" ");

      if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");
      this.url = url;
      this.method = method.toLocaleLowerCase();
    }

    this.childs = schema.childs ? this.createChilds(schema.childs) : [];
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
