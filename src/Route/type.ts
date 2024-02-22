import RouteNormalization from "../RouteNormalization/RouteNormalization";
import SwaggerConfig from "../Swagger/Core/SwaggerBuilder";
import RouteLoader from "./RouteLoader";

export type RouteSchema = {
  code: string;
  url: string;
  method: string;
  middlewares: Promise<void>[];
  handler?: Promise<void>;
  request: Object;
  response: Record<string, RouteRequest>;
  queries?: RouteRequest;
  params?: RouteRequest;
  childs: RouteSchema[];
};

export type RouteConfigSchema = {
  path: string;
  swaggerConfig: SwaggerConfig;
  routeLoader?: RouteLoader;
  routeNormalization?: RouteNormalization;
};

export type RouteRequest = Record<string, any> | Record<string, Record<string, any>>;

export type RouteParameterAttributes = {
  description?: string;
  required?: boolean;
  example?: any;
};
