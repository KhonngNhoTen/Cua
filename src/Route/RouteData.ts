import { RouteDecorAttribute } from "./type";

export class RouteData {
  public data?: any;
  public decorators?: RouteDecorAttribute;

  constructor(data?: Object, decorators?: RouteDecorAttribute) {
    if (data && !decorators) {
      if (!this.isWrapperRepsonse(data)) this.data = { "200": data };
      else this.data = data;
    } else {
      this.decorators = decorators;
    }
  }

  isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}
