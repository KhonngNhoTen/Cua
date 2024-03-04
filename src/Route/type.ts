import { SwaggerBuilder } from "../Swagger/Core/SwaggerBuilder";
import { BaseRouteDataTransform } from "./BaseRouteDataTransform";
import RouteLoader from "./RouteLoader";

export type RouteSchema = {
  code: string;
  description?: string;
  tags?: string[];
  url?: string;
  method?: string;
  middlewares?: Promise<void>[];
  handler?: (...params: any) => Promise<void>;
  request?: Object | BaseRouteDataTransform;
  response?: Record<string, RouteDataTransform | BaseRouteDataTransform> | BaseRouteDataTransform;
  parameters?: string[] | RouteParameter;
  childs?: RouteSchema[];
  security?: boolean | string[];
  baseUrl?: string;
};

export type NormalizationRoute = (...param: any[]) => { req: any; res: any; next: any; extraData: any };

export type RouteConfigSchema = {
  path: string;
  swaggerConfig: SwaggerBuilder;
  routeLoader?: RouteLoader;
  routeNormalization?: NormalizationRoute;
};

export type RouteDataTransform = Record<string, any> | Record<string, Record<string, any>>;

export type RouteParameterAttributes = {
  description?: string;
  required?: boolean;
  example?: any;
};
export type LocationParameter = "query" | "header" | "path" | "cookie";
export type RouteParameter = {
  path?: RouteDataTransform;
  query?: RouteDataTransform;
  header?: RouteDataTransform;
  cookie?: RouteDataTransform;
};
