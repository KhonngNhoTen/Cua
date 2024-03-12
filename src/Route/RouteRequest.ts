import { RouteDecorAttribute } from "./type";

export class RouteRequest {
  public data?: Object = {};
  public decorators?: RouteDecorAttribute;

  constructor(data?: Object, decorators?: RouteDecorAttribute) {
    if (data) this.data = data;
    this.decorators = decorators;
  }
}
