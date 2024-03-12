import { RouteStreamData } from "./RouteStreamData";
import { RouteDecorAttribute } from "./type";

type RouteResponseOptions = {
  data: Object;
  decorators?: Record<string, RouteDecorAttribute>;
  file?: RouteStreamData;
};

export class RouteResponse {
  public data?: { [httpStatus: string]: any } = {};
  public decorators?: RouteDecorAttribute;
  private defaultPrefix: string = "default";

  constructor(data?: Object, decorators?: RouteDecorAttribute | Record<string, RouteDecorAttribute>) {
    const checkData = data ?? decorators;
    if (!this.isWrapperRepsonse(checkData as Object)) {
      if (data) this.data = { [this.defaultPrefix]: data };
      if (decorators) this.decorators = decorators as RouteDecorAttribute;
      return;
    }

    this.data = data;
    this.decorators = decorators as Record<string, RouteDecorAttribute>;
  }

  isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}
