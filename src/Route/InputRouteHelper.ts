import { IRoutePlugin, RoutePlugin } from "./RoutePlugin";
import {
  InputRequest,
  InputResponse,
  InputRouteDataTransform,
  InputRouteSchema,
  isRouteRequest,
  isRouteResponse,
  RouteAttributeData,
  RouteRequest,
  RouteResponse,
  RouteSchema,
} from "./type";

export class InputRouteHelper implements IRoutePlugin {
  createPlugin(): RoutePlugin {
    return {
      beforeCreateRoute: this.convertInput,
    };
  }

  convertInput(input: InputRouteSchema, out: RouteSchema) {
    out.parameters = this.convertParameter(input);
    if (input.request && !isRouteRequest(out.request)) out.request = this.convertRequest(input);
    if (input.response && !isRouteResponse(out.response)) out.response = this.convertResponses(input);
    return out;
  }

  convertRouteAttributeData(data: InputRequest | InputResponse): Record<string, RouteAttributeData> {
    return Object.keys(data).reduce((init, val) => {
      init[val] = {
        type: this.getType(val),
        example: val,
        description: "No desciptions",
      };
      return init;
    }, {} as RouteRequest);
  }

  convertRequest(input: InputRouteSchema): RouteRequest | undefined {
    if (!input.request) return undefined;

    const request = input.request;

    return this.convertRouteAttributeData(request);
  }

  convertResponses(input: InputRouteSchema): RouteResponse | undefined {
    if (!input.response) return undefined;
    const response = input.response;
    let resOpts: RouteResponse = {};
    if (this.isWrapperRepsonse(response)) {
      const httpStatus = Object.keys(response);
      for (let i = 0; i < httpStatus.length; i++) {
        const status = (response as Record<string, InputRouteDataTransform>)[httpStatus[i]];
        resOpts[httpStatus[i]] = this.convertRouteAttributeData(status);
      }
    } else {
      resOpts = {
        default: this.convertRouteAttributeData(input.response),
      };
    }
    return resOpts;
  }

  convertParameter(schema: InputRouteSchema) {
    // Create parameter (query) if input is a Array
    let parameters = Array.isArray(schema.parameters)
      ? { query: schema.parameters.reduce((init, val) => ({ ...init, [val]: "" }), {}) }
      : schema.parameters;

    // Create parameter (params - path), if the path contains {abc}.
    // The path'll find params and add to parameter objects

    if (schema.url && this.isAPI(schema)) {
      const routeUrl = schema.url;
      let [method, url] = routeUrl.split(" ");
      if (!method || !url) throw new Error("Url's format is : '<METHOD> <PATH>'");

      let path: any = {};
      url.replace(/:\w+/g, (param) => {
        param = param.replace(":", "");
        path[param] = "";
        return `{${param}}`;
      });
      parameters = { ...parameters, path };
    }
    return parameters;
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
