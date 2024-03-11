import { Route } from "./Route";
import { RouteRequest } from "./RouteRequest";
import { RouteResponse } from "./RouteResponse";
import { RouteStreamData } from "./RouteStreamData";

//#region DEFINE TYPE FOR INPUT CONTRUCTOR OF ROUTE
export type InputRouteSchema = {
  code: string;
  description?: string;
  tags?: string[];
  url?: string;
  method?: string;
  middlewares?: Promise<void>[];
  handler?: (...params: any) => Promise<void>;
  request?: InputRequest | RouteRequest;
  response?: InputResponse | RouteResponse;
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
  request?: RouteRequest | RouteStreamData;
  response?: RouteResponse | RouteStreamData;
  parameters?: RouteParameter;
  childs?: Route[];
  security?: boolean | string[];
  baseUrl?: string;
};

export type NormalizationRoute = (...param: any[]) => { req: any; res: any; next: any; extraData: any };

export type InputRouteDataTransform = Record<string, any> | Record<string, Record<string, any>>;

export type InputResponse = Record<string, InputRouteDataTransform>;
export type InputRequest = Object;
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
export type RouteDecorAttribute = {
  type: string;
  example: any;
  description: string;
  format?: string;
  nullable?: boolean;
  decorators?: Record<string, RouteDecorAttribute>;
};
export type RouteAttributeData = {
  type: string;
  example: any;
  description: string;
  format?: string;
  nullable?: boolean;
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

//#endregion
