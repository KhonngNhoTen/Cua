import RouteNormalization from "../RouteNormalization/RouteNormalization";
import { SwaggerBuilder } from "../Swagger/Core/SwaggerBuilder";
import RouteLoader from "./RouteLoader";

export type RouteSchema = {
  code: string;
  description?: string;
  tags?: string[];
  url?: string;
  method?: string;
  middlewares?: Promise<void>[];
  handler?: Promise<void>;
  request?: Object;
  response?: Record<string, RouteDataTransform> | RouteDataTransform;
  parameters?: RouteParameter;
  childs?: RouteSchema[];
  security?: any;
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
