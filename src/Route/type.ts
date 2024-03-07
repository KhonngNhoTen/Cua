import { IRouteDataTransform } from "./IRouteDataTransform";
import { Route } from "./Route";

//#region DEFINE TYPE FOR INPUT CONTRUCTOR OF ROUTE
export type InputRouteSchema = {
  code: string;
  description?: string;
  tags?: string[];
  url?: string;
  method?: string;
  middlewares?: Promise<void>[];
  handler?: (...params: any) => Promise<void>;
  request?: InputRequest;
  response?: InputResponse;
  parameters?: string[] | RouteParameter;
  childs?: InputRouteSchema[];
  security?: boolean | string[];
  baseUrl?: string;
};
export type RouteSchema = {
  code?: string;
  description?: string;
  tags?: string[];
  url?: string;
  method?: string;
  middlewares?: Promise<void>[];
  handler?: (...params: any) => Promise<void>;
  request?: RouteRequest;
  response?: RouteResponse;
  parameters?: RouteParameter;
  childs?: Route[];
  security?: boolean | string[];
  baseUrl?: string;
};

export type NormalizationRoute = (...param: any[]) => { req: any; res: any; next: any; extraData: any };

export type InputRouteDataTransform = Record<string, any> | Record<string, Record<string, any>>;

export type InputResponse = Record<string, InputRouteDataTransform | IRouteDataTransform> | IRouteDataTransform;
export type InputRequest = Object | IRouteDataTransform;
export type LocationParameter = "query" | "header" | "path" | "cookie";

export type InputParameters =
  | string[]
  | {
      path?: Record<string, InputRouteDataTransform>;
      query?: Record<string, InputRouteDataTransform>;
      header?: Record<string, InputRouteDataTransform>;
      cookie?: Record<string, InputRouteDataTransform>;
    };

//#endregion

//#region DEFINE TYPE FOR ATTRIBUTE OF ROUTE CLASS

export type RouteAttributeData = {
  type: string;
  example: any;
  description: string;
  format?: string;
  nullable?: boolean;
};
export type RouteRequest = {
  [fieldName: string]: RouteAttributeData;
};
export type RouteResponse = {
  [httpStatus: string]: {
    [fieldName: string]: RouteAttributeData;
  };
};
export type RouteParameterAttributes = {
  description?: string;
  required?: boolean;
  example?: any;
};
export type RouteParameter = {
  path?: Record<string, RouteParameterAttributes>;
  query?: Record<string, RouteParameterAttributes>;
  header?: Record<string, RouteParameterAttributes>;
  cookie?: Record<string, RouteParameterAttributes>;
};

export function isRouteResponse(object: any): object is RouteResponse {
  const httpStatuses = Object.keys(object);
  if (/^[0-9]+$/.test(httpStatuses.reduce((init, val) => (init += val), "")) === false) return false;

  for (let i = 0; i < httpStatuses.length; i++) {
    const keys = Object.keys(httpStatuses);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const attribute = object[key] as RouteAttributeData;
      if (attribute.description && attribute.type && attribute.example) continue;
      return false;
    }
  }
  return true;
}
export function isRouteRequest(object: any): object is RouteRequest {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const attribute = object[key] as RouteAttributeData;
    if (attribute.description && attribute.type && attribute.example) continue;
    return false;
  }
  return true;
}
//#endregion
