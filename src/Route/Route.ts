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
  request?: Object;
  response: Record<string, RouteDataTransform> = {};
  parameters?: RouteParameter;
  childs: Route[];
  security: any;

  constructor(schema: RouteSchema, parentSchema?: RouteSchema) {
    this.code = schema.code;
    this.middlewares = schema.middlewares ?? [];
    this.handler = schema.handler;
    this.response = schema.response ?? {};
    this.request = schema.request ?? undefined;
    this.parameters = schema.parameters ?? undefined;
    this.baseUrl = schema.baseUrl;
    this.tags = schema.tags ?? parentSchema?.tags;

    if (schema.url && this.isAPI()) {
      let [method, url] = schema.url.split(" ");
      if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");

      url = url.replace(/:\w+/g, (params) => `{${params.replace(":", "")}}`);

      this.url = parentSchema?.baseUrl ? parentSchema?.baseUrl + url : url;
      this.method = method.toLocaleLowerCase();
    }

    this.childs = schema.childs ? this.createChilds(schema.childs, schema) : [];
  }

  protected createChilds(schemas: RouteSchema[], currentSchema?: RouteSchema) {
    if (!schemas || schemas.length < 0) return [];
    return schemas.map((e) => new Route(e, currentSchema));
  }

  registry(req: any) {
    const middlewares = [...this.middlewares, this.handler];
    req[this.method](middlewares);
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
