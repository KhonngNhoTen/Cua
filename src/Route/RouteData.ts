import { RouteDecorAttribute } from "./type";

export class RouteData {
  public data?: Object;
  public decorators?: RouteDecorAttribute[];

  constructor(data?: Object, decorators?: RouteDecorAttribute[]) {
    this.data = data;
    this.decorators = decorators;
  }
}
