import { RouteStreamData } from "./RouteStreamData";
import { RouteDecorAttribute } from "./type";

type RouteResponseOptions = {
  data: Object;
  decorators?: Record<string, RouteDecorAttribute>;
  file?: RouteStreamData;
};

export class RouteResponse {
  public data: { [httpStatus: string]: any } = {};
  public decorators?: Record<string, Record<string, RouteDecorAttribute>>;
  private defaultPrefix: string = "default";

  constructor(
    data?: Object,
    decorators?: Record<string, Record<string, RouteDecorAttribute>> | Record<string, RouteDecorAttribute>
  ) {
    if (!data) return;
    if (!this.isWrapperRepsonse(data)) {
      this.data = { [this.defaultPrefix]: data };
      if (decorators) this.decorators = { [this.defaultPrefix]: decorators as Record<string, RouteDecorAttribute> };
      return;
    }
    this.data = data;
    this.decorators = decorators as Record<string, Record<string, RouteDecorAttribute>>;
  }

  isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}
