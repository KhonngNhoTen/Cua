import { IRoutePlugin, RoutePlugin } from "../Route/RoutePlugin";
import { RouteRequest } from "../Route/RouteRequest";
import { RouteResponse } from "../Route/RouteResponse";
import { RouteStreamData } from "../Route/RouteStreamData";
import { InputRouteSchema, RouteSchema } from "../Route/type";

export class InputRouteHelper implements IRoutePlugin {
  createPlugin(): RoutePlugin {
    return {
      beforeCreateRoute: (input: InputRouteSchema, out: RouteSchema, parentSchema?: InputRouteSchema) =>
        this.convertInput(input, out, parentSchema),
    };
  }

  convertInput(input: InputRouteSchema, out: RouteSchema, parentSchema?: InputRouteSchema) {
    const resultPath = this.convertParameter(input, parentSchema);
    out = { ...out, ...resultPath };
    if (input.request && !(input.request instanceof RouteRequest) && !(input.request instanceof RouteStreamData))
      out.request = new RouteRequest(input.request);
    if (input.response && !(input.response instanceof RouteResponse) && !(input.response instanceof RouteStreamData))
      out.response = new RouteResponse(input.response);

    if (input.request instanceof RouteStreamData) out.request = input.request;
    if (input.response instanceof RouteStreamData) out.response = input.response;
    return out;
  }
  convertParameter(schema: InputRouteSchema, parentSchema?: InputRouteSchema) {
    // Create parameter (query) if input is a Array
    let parameters = Array.isArray(schema.parameters)
      ? { query: schema.parameters.reduce((init, val) => ({ ...init, [val]: "" }), {}) }
      : schema.parameters;

    // Create parameter (params - path), if the path contains {abc}.
    // The path'll find params and add to parameter objects
    let method, url;
    if (schema.url && this.isAPI(schema)) {
      [method, url] = schema.url.split(" ");
      url = parentSchema?.baseUrl ? parentSchema?.baseUrl + url : url;
      if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");

      let path: any = {};
      url = url.replace(/:\w+/g, (param) => {
        param = param.replace(":", "");
        path[param] = "";
        return `{${param}}`;
      });
      parameters = { ...parameters, path };
    }
    return { parameters, url, method };
  }

  isAPI(schema: InputRouteSchema) {
    return !schema.baseUrl;
  }

  getType(value: any) {
    return {}.toString.call(value).split(" ")[1].slice(0, -1).toLowerCase();
  }

  isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}
