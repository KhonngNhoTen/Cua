import { RouteDecorAttribute } from "./type";

export class RouteRequest {
  public data: Object = {};
  public decorators?: Record<string, RouteDecorAttribute>;

  constructor(data?: Object, decorators?: Record<string, RouteDecorAttribute>) {
    this.data = data ?? {};
    this.decorators = decorators;
  }
}
